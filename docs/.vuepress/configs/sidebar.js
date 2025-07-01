const client = require("./sidebar/client.js");
const admin = require("./sidebar/admin.js");
const vkPay = require("./sidebar/vk-uni-pay.js");
const dbMigration = require("./sidebar/db-migration.js");
const vkRedis = require("./sidebar/vk-redis.js");
const vkLuckyDraw = require("./sidebar/vk-lucky-draw.js");
module.exports = {
  '/client/': client,
  '/admin/': admin,
  '/vk-uni-pay/': vkPay,
  '/db-migration/': dbMigration,
  '/vk-redis/': vkRedis,
  '/vk-lucky-draw/': vkLuckyDraw
};
