/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://vipestadias.online",
  generateRobotsTxt: true,
  changefreq: "weekly",
};
