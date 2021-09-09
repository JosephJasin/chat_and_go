global.rootDir = __dirname;
process.env.NODE_CONFIG_DIR = rootDir + '/config/';
process.env.NODE_ENV = 'development';


//Database Connection pool
const mysql = require("mysql2/promise");
const config = require("config");

(async () => {
    global.pool = await mysql.createPool(config.db);
    require('./src/app.js');
})();







