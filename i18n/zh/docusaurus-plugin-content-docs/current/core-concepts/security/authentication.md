---
title: 认证
---

Kubedoop 把认证拆成两半。`AuthenticationClass` 描述**怎么认证**——一个 LDAP 服务器、一个 OIDC
签发方、一份静态用户名单——在整个集群范围内只定义一次。产品则指名它要用哪个 class。
身份提供方只配置在一处，任意多个集群都可以指向它。

## AuthenticationClass

`AuthenticationClass` 属于 `authentication.kubedoop.dev/v1alpha1` API 组，是**集群级**资源，
因此没有命名空间，对集群里所有产品可见。它的简称是 `authclass`：

```bash
kubectl get authclass
```

spec 就是一个 `provider` 块，指明一种认证机制：

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

| Provider | 描述 |
|----------|------|
| `static` | 存放用户凭据的 Secret |
| `ldap` | LDAP 或 Active Directory 服务器 |
| `oidc` | OpenID Connect 签发方 |
| `tls` | 客户端证书认证 |
| `kerberos` | Kerberos 域 |

### 请只设置一个 provider

五个字段在 schema 里都是可选的，**同时设置多个或一个都不设，都不会被拒绝**。产品按固定顺序检查
字段并取第一个命中项，所以同时写了 `oidc` 和 `ldap` 的 class 会走 OIDC，而 LDAP 块被静默忽略。
以 Trino 为例，它的检查顺序是 `oidc` → `static` → `ldap`。

请把"每个 class 只配一个 provider"当成需要自己遵守的纪律。两种机制就建两个 class。

### 并非每个产品都支持全部 provider

API 定义了五种 provider，具体某个 Operator 只实现对该产品有意义的子集。Trino 支持 `oidc`、
`static` 和 `ldap`。把 Trino 集群指向一个 provider 为 `tls` 或 `kerberos` 的 class，
结果是完全拿不到认证器，而且 apply 时不会报错。

在假定某个 provider 已接通之前，请先查阅对应 Operator 的文档。

## 在产品中引用 class

产品按名字引用 class。Trino 接受一个列表，因此一个集群可以同时提供多种认证方式：

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

由于 class 是集群级资源，`authenticationClass` 只是一个名字——不需要也无法加命名空间限定。

## static

最简单的 provider：产品所在命名空间里一个存放用户凭据的 Secret。

```yaml
spec:
  provider:
    static:
      userCredentialsSecret:
        name: trino-users
```

该 Secret 内部的键是**因产品而异**的——每个产品按自己认证机制期望的格式去读，
具体结构请查阅对应 Operator 的文档。`AuthenticationClass` 只负责携带这个 Secret 的名字。

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

| 字段 | 必填 | 默认值 |
|------|------|--------|
| `hostname` | 是 | — |
| `port` | 否 | `389`，设置了 `tls` 时为 `636` |
| `bindCredentials` | 是 | — |
| `searchBase` | 否 | `""` |
| `searchFilter` | 否 | `""` |
| `ldapFieldNames` | 否 | 见下 |
| `tls` | 否 | — |

`bindCredentials.secretClass` 指向的 SecretClass，其 Secret 必须包含两个键：

| 键 | 含义 |
|----|------|
| `user` | 绑定 DN，例如 `cn=admin,dc=example,dc=com` |
| `password` | 绑定密码 |

`ldapFieldNames` 把 Kubedoop 认知中的用户属性映射到你的目录 schema 上。默认值适配标准
OpenLDAP 布局：

| 字段 | 默认值 |
|------|--------|
| `uid` | `uid` |
| `group` | `memberof` |
| `email` | `mail` |
| `givenName` | `givenName` |
| `surname` | `sn` |

Active Directory 使用的属性名不同——通常是 `sAMAccountName` 而非 `uid`——
因此对接 AD 的 class 需要显式设置这些字段。

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

| 字段 | 必填 | 默认值 |
|------|------|--------|
| `hostname` | 是 | — |
| `port` | 否 | — |
| `principalClaim` | 是 | — |
| `providerHint` | 是 | — |
| `rootPath` | 否 | `/` |
| `scopes` | 否 | — |
| `tls` | 否 | — |

`principalClaim` 指定 ID token 中哪个 claim 被产品当作用户名。

**`providerHint` 目前只接受 `keycloak`。** 它是必填且带枚举约束的字段，因此填其他签发方会在
apply 阶段直接被拒绝。当前受支持的 OIDC 签发方就是 Keycloak。

### 客户端凭据属于产品，不属于 class

`AuthenticationClass` 描述的是签发方。客户端 ID 和 secret 属于具体集群，
因此在引用 class 的地方提供：

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

该 Secret 必须包含：

| 键 |
|----|
| `CLIENT_ID` |
| `CLIENT_SECRET` |

它们会以环境变量的形式注入 Pod。

## tls 与 kerberos

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

`tls` 通过客户端出示的证书完成认证，证书由指定的 SecretClass 签发；
`kerberos` 指向承载 Kerberos 凭据分发的 StorageClass。两者的支持情况都取决于产品，参见上文提醒。

## TLS 校验

`ldap` 和 `oidc` 都接受 `tls` 块，且一旦出现，其中的 `verification` 是**必填**的：

```yaml
tls:
  verification:
    server:
      caCert:
        secretClass: tls
```

| `verification` | 行为 |
|----------------|------|
| `server.caCert.secretClass` | 用该 SecretClass 提供的 CA 校验 |
| `server.caCert.webPki: {}` | 用系统内置的公共 CA 集校验 |
| `none: {}` | 完全不校验证书 |

在 LDAP provider 上设置 `tls`，同时会把默认端口从 389 改为 636。

## 相关内容

- [角色和角色组](../common-configuration-mechanisms/roles-and-role-groups.md)
- [S3](../resources/s3.md)
