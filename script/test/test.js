const bundler = require('../src')
const fs = require('fs')
const path = require('path')
const content = bundler('./index')

fs.writeFileSync(path.resolve(__dirname,'./index.bundle.js'),content,'utf-8')
