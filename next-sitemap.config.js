/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://andes-stay.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
};
