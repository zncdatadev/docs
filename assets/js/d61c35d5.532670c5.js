"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[476],{4645:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"developer-manual/collaboration","title":"Collaboration Guide","description":"This document will guide you on how to contribute to ZNCDataDev. Please take some time to read the details before contributing code.","source":"@site/docs/developer-manual/collaboration.md","sourceDirName":"developer-manual","slug":"/developer-manual/collaboration","permalink":"/docs/developer-manual/collaboration","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/developer-manual/collaboration.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732190430000,"frontMatter":{},"sidebar":"docs","previous":{"title":"spark-k8s-operator","permalink":"/docs/operators/spark-k8s-operator"},"next":{"title":"\u5f00\u53d1\u6307\u5357","permalink":"/docs/developer-manual/develop-guideline"}}');var i=t(4848),s=t(8453);const a={},r="Collaboration Guide",l={},c=[{value:"Code of Conduct",id:"code-of-conduct",level:2},{value:"Branch Management",id:"branch-management",level:2},{value:"First Contribution",id:"first-contribution",level:2},{value:"Pull Request",id:"pull-request",level:2},{value:"Commit Message Conventions",id:"commit-message-conventions",level:2},{value:"Commit Message Format",id:"commit-message-format",level:3},{value:"Scope",id:"scope",level:4},{value:"Type",id:"type",level:4},{value:"Subject",id:"subject",level:4},{value:"Body",id:"body",level:4},{value:"Footer",id:"footer",level:4}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"collaboration-guide",children:"Collaboration Guide"})}),"\n",(0,i.jsx)(n.p,{children:"This document will guide you on how to contribute to ZNCDataDev. Please take some time to read the details before contributing code."}),"\n",(0,i.jsx)(n.h2,{id:"code-of-conduct",children:"Code of Conduct"}),"\n",(0,i.jsxs)(n.p,{children:["We have a ",(0,i.jsx)(n.a,{href:"https://github.com/kubedoop.dev/docs.git/CODE_OF_CONDUCT.md",children:"Code of Conduct"})," that we hope all contributors will follow.\nPlease take the time to read it in full to ensure you understand what is acceptable and what is not."]}),"\n",(0,i.jsx)(n.h2,{id:"branch-management",children:"Branch Management"}),"\n",(0,i.jsxs)(n.p,{children:["We maintain the main branch (",(0,i.jsx)(n.code,{children:"main"}),") and release branches (",(0,i.jsx)(n.code,{children:"release-x.x"}),") for the long term. The main branch contains the latest code,\nand we periodically merge new features and functionalities into it, so it may have some bugs and instability.\nWhen the main branch accumulates enough features or reaches a point in the release roadmap, we will create a new release branch from the main branch.\nWe will test and fix bugs on the release branch until it stabilizes, then merge it back into the main branch and release a new version."]}),"\n",(0,i.jsxs)(n.p,{children:["Before contributing code, please determine whether you are fixing a bug for a specific version or developing a new feature. If fixing a bug,\ndevelop on a ",(0,i.jsx)(n.code,{children:"fix/"})," prefix branch and merge it into the release branch for that version. We will release a ",(0,i.jsx)(n.code,{children:"patch"})," version at an appropriate time.\nIf developing a new feature, develop on a ",(0,i.jsx)(n.code,{children:"feature/"})," prefix branch and merge it into the main branch."]}),"\n",(0,i.jsx)(n.h2,{id:"first-contribution",children:"First Contribution"}),"\n",(0,i.jsxs)(n.p,{children:["If this is your first time contributing code, please refer to ",(0,i.jsx)(n.a,{href:"/docs/developer-manual/first-commiter",children:"First Contribution"})," to get started quickly."]}),"\n",(0,i.jsx)(n.h2,{id:"pull-request",children:"Pull Request"}),"\n",(0,i.jsxs)(n.p,{children:["We use Pull Requests to merge code. If you are not familiar with Pull Requests,\nplease refer to the ",(0,i.jsx)(n.a,{href:"https://docs.github.com/cn/github/collaborating-with-issues-and-pull-requests/about-pull-requests",children:"GitHub Documentation"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"We will review and merge Pull Requests in a timely manner, but we may ask you to make some modifications after code review before merging.\nIf your Pull Request is not responded to promptly, please raise it in our community, and we will address it as soon as possible."}),"\n",(0,i.jsx)(n.p,{children:"Before submitting a Pull Request, please check the following list:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Develop based on the correct branch"}),"\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"pre-commit"})," and ensure there are no issues"]}),"\n",(0,i.jsx)(n.li,{children:"Follow the commit message conventions"}),"\n",(0,i.jsx)(n.li,{children:"Ensure all GitHub CI checks pass; if they fail, review the reasons and make corrections"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Once all issues are resolved, submit the Pull Request."}),"\n",(0,i.jsx)(n.h2,{id:"commit-message-conventions",children:"Commit Message Conventions"}),"\n",(0,i.jsx)(n.p,{children:"Clear and readable commit messages help with issue tracking and facilitate the automatic generation of CHANGELOGs. Therefore, we require all commit messages to follow these conventions:"}),"\n",(0,i.jsx)(n.h3,{id:"commit-message-format",children:"Commit Message Format"}),"\n",(0,i.jsx)(n.p,{children:"Each commit message consists of a header, body, and footer. The header has a special format that includes the type, scope, and subject:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"<type>(<scope>): <subject>\n<BLANK LINE>\n<body>\n<BLANK LINE>\n<footer>\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.strong,{children:"header is mandatory, while the body and footer are optional"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"No line in the commit message should exceed 100 characters! This makes the message easier to read in GitHub and various git tools."}),"\n",(0,i.jsx)(n.p,{children:"Example commits:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"docs(changelog): update changelog to beta.5\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"fix(release): need to depend on latest rxjs and zone.js\n\nThe version in our package.json gets copied to the one we publish, and users need the latest of these.\n"})}),"\n",(0,i.jsx)(n.h4,{id:"scope",children:"Scope"}),"\n",(0,i.jsx)(n.p,{children:"The scope is optional and is used to identify the area affected by the commit. For example, the change might be related to a specific module or type of task."}),"\n",(0,i.jsx)(n.h4,{id:"type",children:"Type"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)"}),"\n",(0,i.jsx)(n.li,{children:"ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)"}),"\n",(0,i.jsx)(n.li,{children:"docs: Documentation only changes"}),"\n",(0,i.jsx)(n.li,{children:"feat: A new feature"}),"\n",(0,i.jsx)(n.li,{children:"fix: A bug fix"}),"\n",(0,i.jsx)(n.li,{children:"perf: A code change that improves performance"}),"\n",(0,i.jsx)(n.li,{children:"refactor: A code change that neither fixes a bug nor adds a feature"}),"\n",(0,i.jsx)(n.li,{children:"style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"}),"\n",(0,i.jsx)(n.li,{children:"test: Adding missing tests or correcting existing tests"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"subject",children:"Subject"}),"\n",(0,i.jsx)(n.p,{children:"The subject contains a succinct description of the change:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Use the imperative, present tense: \u201cchange\u201d not \u201cchanged\u201d nor \u201cchanges\u201d"}),"\n",(0,i.jsx)(n.li,{children:"Do not capitalize the first letter"}),"\n",(0,i.jsx)(n.li,{children:"No dot (.) at the end"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"body",children:"Body"}),"\n",(0,i.jsx)(n.p,{children:"Just as in the subject, use the imperative, present tense: \u201cchange\u201d not \u201cchanged\u201d nor \u201cchanges\u201d. The body should include the motivation for the change and contrast this with previous behavior."}),"\n",(0,i.jsx)(n.h4,{id:"footer",children:"Footer"}),"\n",(0,i.jsx)(n.p,{children:"The footer should contain any information about breaking changes and is also the place to reference GitHub issues that this commit closes."}),"\n",(0,i.jsx)(n.p,{children:"Breaking changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this."}),"\n",(0,i.jsx)(n.p,{children:"A detailed explanation can be found in this document."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var o=t(6540);const i={},s=o.createContext(i);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);