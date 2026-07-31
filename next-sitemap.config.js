/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://andes-stay-o6fy.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
};
