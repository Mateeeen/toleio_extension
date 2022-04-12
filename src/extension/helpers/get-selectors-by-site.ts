export const getSelectorsBySite = (hostname: string): string[] =>
  siteDefs.find((d) => d.hostname === hostname)?.selectors ||
  (siteDefs.find((d) => d.hostname === "*")?.selectors as string[])

const siteDefs = [
  {
    hostname: "linkedin.com",
    selectors: ["span"],
  },
  {
    hostname: "*",
    selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "div", "span"],
  },
]
