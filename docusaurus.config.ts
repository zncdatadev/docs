import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'KubeDataStack',
  tagline: 'kubedatastack',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://zncdata.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zncdatadev', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    path: 'i18n',
    localeConfigs: {
      zh: {
        label: '简体中文',
        htmlLang: 'zh-cmn-Hans',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/zncdatadev/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          includeCurrentVersion: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    algolia: {
      // The application ID provided by Algolia
      appId: 'CMFV2PO3C2',
      // Public API key: it is safe to commit it
      apiKey: '45b2515504bc6b7ec063dcef9d22e572',
      indexName: 'zncdata',
      contextualSearch: true,
      externalUrlRegex: 'zncdata.dev',
      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
      // ref: https://docsearch.algolia.com/docs/api/#searchparameters
    }, 
    navbar: {
      title: 'KubeDataStack',
      logo: {
        alt: 'kubedatastack',
        src: 'img/favicon.ico',
      },
 
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          label: 'Languages',
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/zncdatadev/zncdata-stack',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Document',
          items: [
            {
              label: 'Installation',
              to: 'docs/quick-start/installation', // ref sidebars.ts
            },
          ],
        },
        {
          title: 'Community',
          items: [
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zncdatadev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} zncdata.dev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
