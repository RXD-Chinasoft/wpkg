
let str = require('./a.js')//浏览器没法跑，webpack可编译成可识别
document.getElementById('app').innerHTML = str

import './index.css'
import './style.less'

if (module.hot) {
    module.hot.accept()//更新，但是不会刷新
    // module.hot.accept('./a.js', function() {//只要a的js修改就会更新，但是不会刷新
    //     let str = require('./a.js')
    //     document.getElementById('app').innerHTML = str
    // })
}