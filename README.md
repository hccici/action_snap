# 目录结构
```
|-- action_snap
    |-- .babelrc 
    |-- .gitignore 
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- readme.md
    |-- webpack.config.js
    |-- dist
    |-- asset // 一些资源文件（与功能无关的）
    |-- media // 存放在discovery上的js
    |-- src 
        |-- index.js // 在这里切换选择媒体
        |-- commonComponent // 公共组件
        |-- costomized // 媒体定制化样式
        |-- media // 媒体配置、索引、覆盖样式等
        |-- normal // 常用样式
        |-- report // 数据上报相关
        |-- utils //工具类
        |-- asset //存放资源文件等
```
# action_snap工作原理说明（以mery为例）
1. mery站点会引入我们发布在discover上的js(dMery，为了方便说明，这是对js的简称)：<https://api.popin.cc/searchbox/action_snap_mery.js>
2. dMery的主要工作有三项：
    - 判断snap功能是否应该使用于该网页，判断条件分别是测试开关、设备类型、是否fashion下的页面。
    - 查询功能插入入口，插入入口标识`<div class="action_snap_entry"></div>`。
    - 获取根据该网页得到的推荐商品，并引入渲染库：<https://api.popin.cc/action_snap/render_mery.js>(rMery)。
3. rMery的主要工作有两项：
    - 渲染页面，展示效果。
    - 上报数据。

<img style="display: block;margin: 0 auto;width: 80%;height: auto" src="./asset/img/action_snap流程图.png"/>

# 开发步骤说明（以mery为视角说明）
1. 首先需要在*action_snpa/media*目录下的mery.js（注意不是src下的）中配置参数：
```javascript
    var config = {
        dataUrl: 'https://api-demo-action.popin.cc/test/api/snap/similar',//数据请求baseUrl 
        // renderUrl: 'https://s3.amazonaws.com/api.popin.cc/action_snap/action_snap.js',// 渲染库url,直接访问aws
        renderUrl: 'https://api.popin.cc/action_snap/action_snap.js',// 渲染库url,通过cdn
        site: 'mery.jp',// 站点
        type: 'normal',// 后端数据接口类型
    }
```
> 注意有两个renderUrl，一个是指向cdn的，一个指向aws的源，由于cdn有缓存跟新比较慢，所以推荐开发、demo阶段用aws的，到上线的时侯，确认cdn的render.js是最新的后，才使用cdn的。

2. 接下来是一系列的判断条件（各个站点会有不同，具体开发时需要根据站点进行修改）：
```javascript
    // 1、开关
    var toggle = true //true为开启限制，正式上线的时候才能设置为false
    if (toggle) {
        ...
    }
    // 2、判断是否是手机端
    function isMobile(ua) {
        ...
    }
    ......
```

3. 插入action_snap的入口，render.js会在这个div下工作：
```javascript
...
        //为了匹配图片，使用图片src作为key值
        var src = item.querySelector('source:nth-child(2)').dataset.srcset
        src = src || ''
        var snap = '<div class="action_snap_entry" data-key="' + src + '"></div>'
        item = item.parentElement.parentElement
        item.insertAdjacentHTML('beforeend', snap)
...
```

4. 最后请求到商品数据后挂载到winow对象下，请求render.js
```javascript
...
ajax({
        url: config.dataUrl,
        data: params,
        success: function (resp) {
            if (resp.message.errMessage === 'success' && resp.content.length !== 0) {
                window.actionSnapData = resp.content
                insertReact()
            }
        }
    })
...
```

5. 接下来是render.js的说明，首先是索引页（src/index.js）
```javascript
/* src/media目录下的索引，在开发对应电商时，import对应的就好，其它的import注释掉 */
// import '@media/nonno/nonno.js'
import '@media/mery/mery.js'
```

6. 在*src/media*下的mery目录就是对这家站点的具体引用配置
- 其中mery.js主要作用是，把对应的入口、数据与react实例绑定起来，让react在对应入口下工作。
```javascript
portList.forEach(function (item, index) {
  var key = item.dataset.key
  var data = actionSnapData[key]
  if (data) {
    ReactDOM.render(
      <ImplantAll data={data} index={index} className='action_snap_box'></ImplantAll>,
      item
    );
  }
})
```
> 其中ImplantAll组件是normal目录下的常用样式，对于常见的通用样式，推荐放在normal下，媒体定制化的样式放在costemized目录下，如果只是一些简单的样式修改，可以通过mery.css进行覆盖。
- config.js是一些展示的文字信息和数据上报的配置文件，同样挂载到window对象下，当作全局变量
```javascript
window.actionSnapConfig = {
    title: '似ているアイテム',// commonComponent title
    gaId: 'UA-158934202-4',//ga上报id
    mediaSite: 'mery.jp',//数据上报
    ecSite : window.actionSnapData[0].list[0].items[0].site//获取展示的是哪家电商，用于数据上报
  }
```

# 关于数据上报（上报对象为action_snap）
数据上报定义在*src/report*目录下，分成两种类型的上报：discovery平台和ga平台。
# 关于数据上报（上报对象为媒体、电商）
当需要上报到到媒体或电商时，可以拓展上报方法，具体做法是在mery中引入对应的extendReport.js
```javascript
import report from '@report'
import {bindMethod} from '@commonMethods'
report.reportPageView=bindMethod(report.reportPageView,()=>{
    console.log('上报到了电商')
})
```
> 注意要在使用report之前使用



