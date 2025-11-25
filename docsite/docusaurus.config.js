// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Quant Notes',
  tagline: 'Personal quant knowledge base',
  favicon: 'img/favicon.ico',

  // 本地用为主，随便写个 url 就行；之后要部署再改
  url: 'https://example.com',
  baseUrl: '/',

  // 如果以后想用 GitHub Pages 再改成你自己的：
  // organizationName: 'Yige-repo',
  // projectName: 'Quant-Repo',
  organizationName: 'quant-user',
  projectName: 'quant-notes',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        // 不用 blog，直接关掉
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Quant Notes',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',   // 对应 sidebars.js 里的 id
            position: 'left',
            label: 'Docs',
          },
        ],
      },

      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Quant Notes. Built for personal learning.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
