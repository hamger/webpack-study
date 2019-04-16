#!/usr/bin/env node

const path = require("path");
const yargs = require("yargs");
const webpack = require("../lib/webpack");

require("./config-optimist")(yargs);
var options = require("./convert-argv")(yargs.argv);
// 定义jsonp的函数名
options.outputJsonpFunction = "webpackJsonp";

// 解析出目标bundle.js所在文件夹
options.outputDirectory = path.dirname(options.output);

// 解析出目标js文件名的格式,默认为 '.bundle.js'
options.outputPostfix = "." + path.basename(options.output);

// 预设loader
options.resolve = options.resolve || {};
options.resolve.loaders = options.resolve.loaders || [];
options.resolve.loaders.push({
  test: /\.less$/,
  loader: "style!less"
});

webpack(options);
