// 需要将cmj规范转换为如下模式，使其能在浏览器端运行
// 需要分析文件之间的依赖关系，并生成映射map
var map = {
    './moduleA':moduleA
}

function require(id){
    var moduleFunc = map[id]
    var module = {exports:{}}
    moduleFunc(module);
    return module.exports;
}
// moduleA.js
function moduleA(module){
    module.exports  = new Date()
}

// index.js
var a = require('./moduleA')
console.log(a)