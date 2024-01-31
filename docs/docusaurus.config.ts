import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ZNCData Stack',
  tagline: 'zncdata stack',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://zncdata.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ZNCData labs', // Usually your GitHub org/user name.
  projectName: 'zncdata-stack', // Usually your repo name.

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
          editUrl: 'https://github.com/zncdata-labs/zncdata-stack',
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
      apiKey: '42ae5bbd812922d63f06f4382b971f82',
      indexName: 'zncdata',
    }, 
    navbar: {
      title: 'ZNCData Stack',
      logo: {
        alt: 'zncdata stack',
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
          href: 'https://github.com/zncdata-labs/zncdata-stack',
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
              href: 'https://github.com/zncdata-labs/zncdata-stack',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ZNCData labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
