---
title: Authentication
---

Authentication in Kubedoop is split in two. An `AuthenticationClass` describes *how* to
authenticate — an LDAP server, an OIDC issuer, a static list of users — once, for the whole
cluster. A product then names the class it wants to use. The identity provider is configured in one
place, and any number of clusters point at it.

## AuthenticationClass

`AuthenticationClass` belongs to the `authentication.kubedoop.dev/v1alpha1` API group and is
**cluster-scoped**, so it has no namespace and is visible to every product in the cluster. Its short
name is `authclass`:

```bash
kubectl get authclass
```

The spec is a single `provider` block naming one mechanism:

```yaml
apiVersion: authentication.kubedoop.dev/v1alpha1
kind: AuthenticationClass
metadata:
  name: ldap
spec:
  provider:
    ldap:
      hostname: openldap.default.svc.cluster.local
      port: 389
      searchBase: ou=users,dc=example,dc=com
      bindCredentials:
        secretClass: ldap-bind
```

| Provider | Describes |
|----------|-----------|
| `static` | A Secret holding user credentials |
| `ldap` | An LDAP or Active Directory server |
| `oidc` | An OpenID Connect issuer |
| `tls` | Client-certificate authentication |
| `kerberos` | A Kerberos realm |

### Set exactly one provider

All five fields are optional in the schema and **nothing rejects a class that sets several, or
none**. Products resolve the provider by checking fields in a fixed order and taking the first
match, so a class with both `oidc` and `ldap` authenticates via OIDC and silently ignores the LDAP
block. Trino, for example, checks `oidc`, then `static`, then `ldap`.

Treat "exactly one provider per class" as a rule you enforce yourself. Two mechanisms means two
classes.

### Not every product supports every provider

The API defines five providers; a given operator implements the subset that makes sense for its
product. Trino handles `oidc`, `static` and `ldap`. Pointing a Trino cluster at a class whose
provider is `tls` or `kerberos` yields no authenticator at all, without a rejection at apply time.

Check the operator's own documentation before assuming a provider is wired up.

## Referencing a class from a product

Products take the class by name. Trino accepts a list, so a cluster can offer more than one method:

```yaml
apiVersion: trino.kubedoop.dev/v1alpha1
kind: TrinoCluster
metadata:
  name: trino
spec:
  clusterConfig:
    authentication:
      - authenticationClass: ldap
```

Because the class is cluster-scoped, `authenticationClass` is just a name — there is no namespace to
qualify.

## static

The simplest provider: a Secret in the product's namespace holding user credentials.

```yaml
spec:
  provider:
    static:
      userCredentialsSecret:
        name: trino-users
```

The keys inside that Secret are **product-specific** — each product reads the format its own
authentication mechanism expects, so consult the operator's documentation for the layout. The
`AuthenticationClass` only carries the Secret's name.

## ldap

```yaml
spec:
  provider:
    ldap:
      hostname: openldap.default.svc.cluster.local
      port: 389
      searchBase: ou=users,dc=example,dc=com
      searchFilter: ""
      bindCredentials:
        secretClass: ldap-bind
      ldapFieldNames:
        uid: uid
        group: memberof
        email: mail
        givenName: givenName
        surname: sn
```

| Field | Required | Default |
|-------|----------|---------|
| `hostname` | yes | — |
| `port` | no | `389`, or `636` when `tls` is set |
| `bindCredentials` | yes | — |
| `searchBase` | no | `""` |
| `searchFilter` | no | `""` |
| `ldapFieldNames` | no | see below |
| `tls` | no | — |

`bindCredentials.secretClass` names a SecretClass whose Secret must contain two keys:

| Key | Meaning |
|-----|---------|
| `user` | Bind DN, for example `cn=admin,dc=example,dc=com` |
| `password` | Bind password |

`ldapFieldNames` maps Kubedoop's notion of a user attribute onto your directory's schema. The
defaults suit a standard OpenLDAP layout:

| Field | Default |
|-------|---------|
| `uid` | `uid` |
| `group` | `memberof` |
| `email` | `mail` |
| `givenName` | `givenName` |
| `surname` | `sn` |

Active Directory uses different attribute names — `sAMAccountName` rather than `uid`, typically —
so an AD-backed class will need these set explicitly.

## oidc

```yaml
spec:
  provider:
    oidc:
      hostname: keycloak.default.svc.cluster.local
      port: 8080
      rootPath: /realms/kubedoop
      principalClaim: preferred_username
      providerHint: keycloak
      scopes:
        - openid
        - email
```

| Field | Required | Default |
|-------|----------|---------|
| `hostname` | yes | — |
| `port` | no | — |
| `principalClaim` | yes | — |
| `providerHint` | yes | — |
| `rootPath` | no | `/` |
| `scopes` | no | — |
| `tls` | no | — |

`principalClaim` is the claim in the ID token the product treats as the username.

**`providerHint` currently accepts only `keycloak`.** It is a required field with an enumerated
value, so any other issuer is rejected at apply time. Keycloak is the supported OIDC issuer today.

### Client credentials live with the product, not the class

The `AuthenticationClass` describes the issuer. The client ID and secret belong to the individual
cluster, so they are supplied where the class is referenced:

```yaml
spec:
  clusterConfig:
    authentication:
      - authenticationClass: keycloak
        oidc:
          clientCredentialsSecret: trino-oidc-client
          extraScopes:
            - profile
```

That Secret must contain:

| Key |
|-----|
| `CLIENT_ID` |
| `CLIENT_SECRET` |

They are passed into the pod as environment variables.

## tls and kerberos

```yaml
spec:
  provider:
    tls:
      clientCertSecretClass: trino-client-tls
```

```yaml
spec:
  provider:
    kerberos:
      kerberosStorageClass: kerberos
```

`tls` authenticates clients by the certificate they present, issued by the named SecretClass.
`kerberos` points at the StorageClass backing Kerberos credential delivery. Support for both is
product-dependent — see the note above.

## TLS verification

`ldap` and `oidc` both accept a `tls` block, and when present its `verification` is **required**:

```yaml
tls:
  verification:
    server:
      caCert:
        secretClass: tls
```

| `verification` | Behaviour |
|----------------|-----------|
| `server.caCert.secretClass` | Verify against the CA published by that SecretClass |
| `server.caCert.webPki: {}` | Verify against the system's public CA bundle |
| `none: {}` | Do not verify the certificate |

Setting `tls` on an LDAP provider also moves the default port from 389 to 636.

## Related

- [Roles and role groups](../common-configuration-mechanisms/roles-and-role-groups.md)
- [S3](../resources/s3.md)
