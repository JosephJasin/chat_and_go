global.rootDir = __dirname;
process.env.NODE_CONFIG_DIR = rootDir + '/config/';
process.env.NODE_ENV = 'development';


require('./src/app.js');