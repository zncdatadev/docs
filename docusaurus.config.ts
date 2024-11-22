import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'Kubedoop Data Platform',
  tagline: 'Kubedoop Data Platform Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://kubedoop.dev/',
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
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    path: 'i18n',
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      zh: {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-cmn-Hans',
        path: 'zh',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        debug: true, // force debug plugin usage
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
    navbar: {
      title: 'Kubedoop Data Platform',
      logo: {
        alt: 'Kubedoop Data Platform',
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
          href: 'https://github.com/zncdatadev/kubedoop',
          position: 'right',
          className: "header-icon-link header-github-link",
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
      copyright: `Copyright © ${new Date().getFullYear()} ZNCDataDev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
