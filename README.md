# Simple-Mall
商城demo，全前端

elemenyuiTest.zip是之前打包的压缩包，解压后npm install就行。

json_3.0.txt相当于数据库，因为这个没有用到数据库，所以数据是读取了txt文档的内容。
操作步骤：
1.运行项目npm run serve，在浏览器打开；
2.点击"选择文件"按钮，并选择json_3.0.txt；
3.点击"点击读取本地文件"按钮，然后就可以进入到登录页面；

===================2个问题====================
1.如果删掉elementuitest目录同级的node_modules会报错，一个是axios，一个是vue-router，应该是这俩装到外层的node_mudels去了；
2.因为没有用到axios，可以直接在main.js目录下注释掉import axios from 'axios'和Vue.prototype.$axios = axios，也可以重新安装；
3.vue-router有用到，所以不能删，解决方法：npm install vue-router@3.1.3 --save-dev
