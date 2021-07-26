
var map = {"./moduleB":"(function (require,module,exports){\nmodule.exports = Math.random()\n})","./moduleA":"(function (require,module,exports){\nconst b = require('./moduleB')\r\nconsole.log('moduleB,',b);\r\nmodule.exports  = new Date()\n})"};

function require(id){
    var moduleFunc = map[id]
    var module = {exports:{}}
    // moduleFunc(module);
    eval(moduleFunc)(require,module,module.exports);
    return module.exports;
}
;((function (require,module,exports){
const a = require('./moduleA')
console.log('a,',a);
}))(require)