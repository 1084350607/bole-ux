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
          items: [
            // This shows `/guide/index.md` page.
            { text: "useArray", link: "../" }, // /guide/index.md
            { text: "useArrayMap", link: "../hooks/useArrayMap.md" }, // /guide/two.md
            { text: "useArrayFind", link: "../hooks/useArrayFind.md" }, // /guide/two.md
            { text: "useArrayEvery", link: "../hooks/useArrayEvery.md" }, // /guide/one.md
            { text: "useArrayFilter", link: "../hooks/useArrayFilter.md" }, // /guide/one.md
          ],
        },
      ],
      "/utils/": [
        {
          text: "Guide",
          items: [
            // This shows `/guide/index.md` page.
            { text: "Index", link: "/guide/" }, // /guide/index.md
            { text: "One", link: "/guide/one" }, // /guide/one.md
            { text: "Two", link: "/guide/two" }, // /guide/two.md
          ],
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
