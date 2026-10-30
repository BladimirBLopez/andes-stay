/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://vipestadias.online",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/admin", "/admin/*", "/api/*", "/sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
  },
};
