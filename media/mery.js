/* eslint-disable */

(function () {
    /* 相关方法 */
    function isMobile(ua) {
        if (!ua && typeof navigator != 'undefined') {
            ua = navigator.userAgent;
        }
        if (ua && ua.headers && typeof ua.headers['user-agent'] == 'string') {
            ua = ua.headers['user-agent'];
        }
        if (typeof ua != 'string') return false;
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    }
    function insertReact(resp) {
        // 设置商品数据
        window.actionSnapData = resp.content.data
        var actionSnapDiscoveryReportCbs = {
            imp: resp.content.callback.imp,
            click: resp.content.callback.click,
        }
        //todo 手动添加pv的模版（应该日本那边统一的）
        var media = getUrlSearch(resp.content.callback.imp, 'media')
        var nid = getUrlSearch(resp.content.callback.imp, 'nid')
        var campaign = getUrlSearch(resp.content.callback.imp, 'campaign')
        var device = isMobile() ? 'mobile' : 'pc'
        actionSnapDiscoveryReportCbs.pv = 'https://rlog.popin.cc/s.gif?url=api.popin.cc&uid=&type=' + device + '_pv&nid=' + nid + '&campaign=' + campaign + '&media=' + media + '&t=2584685128818&tz=jp'
        // 切割参数数组
        var pO = {}
        resp.content.callback.tracking.split('&').forEach(function (item) {
            var temp = item.split('=')
            pO[temp[0]] = temp[1]
        })
        // 设置当前推荐EC网站的相关数据
        window.actionSnapECConfig = {
            site: resp.content.callback.ec,
            gaId: config.gaId,// 我们的ga上报id
            discoveryReportCbs: actionSnapDiscoveryReportCbs,// discovery上报回调
            params: pO,
        }
        var bodyEl = document.querySelector('body');
        var scriptEl = document.createElement("script");
        scriptEl.type = "text/javascript";
        scriptEl.src = config.renderUrl
        bodyEl.appendChild(scriptEl)
    }
    function ajax(opt) {
        //初始化选项
        opt = opt || {};
        opt.method = (opt.method || 'get').toUpperCase();
        opt.url = opt.url || '';
        opt.data = opt.data || null;
        opt.success = opt.success || function () { };

        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                if (xmlHttp.responseText) {
                    opt.success(JSON.parse(xmlHttp.responseText));
                }
            }
        };
        //如果是get请求
        if (opt.method === 'GET') {
            var params = [];
            for (var key in opt.data) {
                params.push(key + '=' + opt.data[key]);
            }
            var postData = params.join('&');
            xmlHttp.open(opt.method, opt.url + '?' + postData);
            xmlHttp.send(null);
        }
        //如果是post
        if (opt.method === 'POST') {
            xmlHttp.open(opt.method, opt.url);
            xmlHttp.send(opt.data);
        }
    }
    function getUrlSearch(url, name) {
        if (!name) return null;
        var after = url.substring(url.indexOf('?'));
        after = after.substr(1);
        if (!after) return null;
        if (after.indexOf(name) === -1) return null;
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = decodeURI(after).match(reg);
        if (!r) return null;
        return r[2];
    }
    // 插入对象 src作为key 样式对象
    function insertEntry(portE, src, style) {
        var styleStr = ''
        var styleKeys = Object.keys(style)
        for (var i = 0; i < styleKeys.length; i++) {
            styleStr += styleKeys[i] + ':' + style[styleKeys[i]] + ';'
        }
        styleStr = 'style="' + styleStr + '"'
        var snap = '<div ' + styleStr + 'class="action_snap_entry" data-key="' + src + '"></div>'
        portE.insertAdjacentHTML('beforeend', snap)

    }
    /* 相关配置 */
    var toggle = false //true为开启限制，正式上线的时候才能设置为false
    // 0开发 1沙河 2正式
    var baseUrlList = ['https://api-demo-action.popin.cc/test/api', 'https://api-demo-action.popin.cc/api', 'https://api-spoton.popin.cc/api']
    var baseUrl = baseUrlList[2]
    var config = {
        dataUrl: baseUrl + '/snap/similar',//整个页面请求
        dataUrl2: baseUrl + '/snap/search',//单个图片请求
        // renderUrl: 'https://s3.amazonaws.com/api.popin.cc/action_snap/action_snap.js',// 渲染库url,直接访问aws，测试用
        renderUrl: 'https://api.popin.cc/action_snap/render_mery.js',// 渲染库url,通过cdn,正式上线用
        site: 'mery.jp',// 站点
        gaId: 'UA-153553428-1'//我们的gaId
    }
    /* 开始工作 */
    // 1、开关
    if (toggle) {
        if (location.href.indexOf('action_snap=true') === -1) {
            return
        }
    }
    // 2、判断设备类型
    var device = ''
    if (!isMobile()) {
        device = 'pc'
        return //暂不支持pc
    } else {
        device = 'mobile'
    }
    //(插入的页面)判断是否是box_items下的内容,插入入口
    if (location.pathname.indexOf('box_items') !== -1) {
        var src = document.querySelector('.box-item-image').src || ''
        // 请求数据后，根据返回结果，插入入口、引入渲染库  
        var params = {
            site: config.site,
            link: encodeURIComponent(src),
            device: device
        }
        ajax({
            url: config.dataUrl2,
            data: params,
            success: function (resp) {
                if (resp.message.errMessage === 'success' && resp.content.length !== 0) {
                    var port = document.querySelector('.side-box-item-curator')
                    insertEntry(port, src, {
                        background: "#ffffff",
                        overflow: "auto",
                        padding: "0 10px"
                    })
                    insertReact(resp)
                }
            }
        })
        return
    }
    // 3、请求数据后，根据返回结果，插入入口、引入渲染库   
    var params = {
        link: encodeURIComponent(location.origin + location.pathname),
        site: config.site,
        device: device
    }
    ajax({
        url: config.dataUrl,
        data: params,
        success: function (resp) {
            if (resp.message.errMessage === 'success' && resp.content.length !== 0) {
                var portList = document.querySelectorAll('.x-content-area div.product picture')//.x-content-area picture
                portList.forEach(function (item) {
                    //为了匹配图片，使用图片src作为key值
                    var src = item.querySelector('source:nth-child(2)').dataset.srcset || ''
                    item = item.parentElement.parentElement
                    // 这里有两个样式不同的插入区域，所以区分开后，加入不同的样式的入口
                    var className = Array.prototype.slice.call(item.classList)[0], style = {}
                    if (className === "product") {
                        style = {
                            padding: '10px'
                        }
                    }
                    insertEntry(item, src, style)
                })
                if(portList.length!==0){
                    insertReact(resp)
                }
            }
        }
    })
})()