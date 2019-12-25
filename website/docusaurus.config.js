/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: "CAPI",
  tagline:
    "CAPI is a commerce API and an admin panel to make it easy for developer to create custom ecommerce applications for any platform.",
  url: "https://OmranAbazid.github.io",
  baseUrl: "/Capi/",
  favicon: "img/favicon.ico",
  organizationName: "OmranAbazid", // Usually your GitHub org/user name.
  projectName: "Capi", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "CAPI",
      // logo: {
      //   alt: "Capi",
      //   src: "img/logo.svg"
      // },
      links: [
        { to: "docs/setup", label: "Docs", position: "left" },
        {
          href: "https://github.com/OmranAbazid/capi",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Docs",
              to: "docs/setup"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CAPI, Inc. Built with Docusaurus.`
    },
    googleAnalytics: {
      trackingID: "UA-155031423-1"
    }
  },
  plugins: ["@docusaurus/plugin-google-analytics"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js")
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
