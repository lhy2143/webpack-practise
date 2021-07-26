// 同步加载示例
// 异步打包：`jsonp`，使用jsonp来请求异步加载的子模块。webpack异步加载文件的函数名叫`webpackJsonp`。
const fs = require('fs')
const path = require('path')
const vm = require('vm')
// 文件执行目录 
const root = path.dirname(require.main.paths[0]);
console.log('root,', root);
const requireIdToModule = {}
const absolutePathToModuleStr = {}
const funcWrapper = ['(function (require,module,exports){', '})']
const template = `
var map = @@map;

function require(id){
    var moduleFunc = map[id]
    var module = {exports:{}}
    // moduleFunc(module);
    eval(moduleFunc)(require,module,module.exports);
    return module.exports;
}
`
// 自动补全文件后缀
const getFilePath = (modulePath) => [modulePath, `${modulePath}.js`].find(fs.existsSync);
function main(id, isFirstComp = true) {
    const pathToModule = getFilePath(path.resolve(root, id))
    console.log(111, pathToModule);
    const content = fs.readFileSync(pathToModule, 'utf-8')
    // 获取正则匹配的内容
    const matcher = /require\(["'`](.*?)["'`]\)/g;

    let match = null;
    while (match = matcher.exec(content)) {
        const [, modulePath] = match;
        console.log(22, modulePath);
        const childPath = getFilePath(path.resolve(path.dirname(pathToModule), modulePath))
        console.log('childPath,', childPath);
        if (requireIdToModule[modulePath]) {
            continue;
        }
        main(childPath, false)
        const childModuleStr = absolutePathToModuleStr[childPath]
        
        requireIdToModule[modulePath] = childModuleStr
    }
    const funcStr = `${funcWrapper[0]}\n${content}\n${funcWrapper[1]}`


    absolutePathToModuleStr[pathToModule] = funcStr
    console.log(1,requireIdToModule);
    const tpl = template.replace('@@map', JSON.stringify(requireIdToModule))
    if (!isFirstComp) return tpl;
    return `${tpl};(${funcStr})(require)`

}

module.exports = main;