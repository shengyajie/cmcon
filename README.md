vue合并adminlte
1.Adminlte中的index的body内的代码复制到index.vue的template中
2.导入bootstrap的css文件，在main.js引入
import 'bootstrap/dist/css/bootstrap.css'
3.把Adminlte中dist文件夹的css、js、img复制到assert内
4.引入jq

vue引入elemet
1.npm i element-ui -S
2.main.js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

待续……
