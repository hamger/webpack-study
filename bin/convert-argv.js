var path = require("path");
var fs = require("fs");
fs.existsSync = fs.existsSync || path.existsSync;

module.exports = function(argv) {
  var options = {};

  if (argv.config) {
    options = require(path.resolve(argv.config));
  } else {
    var configPath = path.resolve("webpack.config.js");
    if (fs.existsSync(configPath)) options = require(configPath);
  }
  if (typeof options != "object" || options === null) {
    console.log("Config did not export a object.");
    process.exit(-1);
  }

  // 获取入口文件的绝对路径
  options.entry = path.join(process.cwd(), options.entry);

  // 上下文,入口js文件所在目录
  options.context = path.dirname(options.entry);

  options.output = path.join(options.context, options.output);

  return options;
};
