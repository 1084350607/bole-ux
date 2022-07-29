import { resolve } from 'path'
import { getSiderBar } from '../helper/getSiderBar.js'

const utilsSiderBar = getSiderBar('utils')
const hooksSiderBar = getSiderBar('hooks')

export default {
  title: "boleTools",
  description: "Bole frontend tools",
  themeConfig: {
    siteTitle: "Datalyst-ToolBox",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "Hooks", link: "/hooks/" },
      { text: "Utils", link: "/utils/" },
      { text: "Styles", link: "/styles/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            // This shows `/guide/index.md` page.
            { text: "Get started", link: "/guide/" }, // /guide/index.md
            { text: "Configuration", link: "/guide/config" }, // /guide/one.md
            { text: "Two", link: "/guide/two" }, // /guide/two.md
          ],
        },
      ],
      "/hooks/": [
        {
          text: "Array",
          items: hooksSiderBar
        },
      ],
      "/utils/": [
        {
          text: "Guide",
          items: utilsSiderBar
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            // This shows `/guide/index.md` page.
            { text: "Index", link: "/guide/" }, // /guide/index.md
            { text: "One", link: "/guide/one" }, // /guide/one.md
            { text: "Two", link: "/guide/two" }, // /guide/two.md
          ],
        },
      ],
      "/styles/": [
        {
          text: "Styles",
          items: [
            // This shows `/guide/index.md` page.
            { text: "Index", link: "/guide/" }, // /guide/index.md
            { text: "One", link: "/guide/one" }, // /guide/one.md
            { text: "Two", link: "/guide/two" }, // /guide/two.md
          ],
        },
      ],
    },
  },
};

const functionSiderBar = getFunctionSiderBar;

function getFunctionSiderBar() {
  // TODO: handle export siderBar
}

