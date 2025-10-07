const path = require('path');
require('ts-node').register({
  transpileOnly: true,
  project: path.resolve(__dirname, '../../tsconfig.json'),
});
const envPath = process.env.ENV_PATH || path.resolve(process.cwd(), '.env');
require('dotenv').config({ path: envPath });
console.log('+++'.repeat(20));

console.log(process.env.DB_DIALECT);

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrationStorageTableName: 'sequelize_meta',
    migrations: [path.resolve(__dirname, 'src/migrations/*.ts')],
  },
  production: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrationStorageTableName: 'sequelize_meta',
    migrations: [
      path.resolve(__dirname, 'dist/libs/database/src/migrations/*.js'),
    ],
  },
};
