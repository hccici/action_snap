/* eslint-disable */
(function () {
    var portList = document.querySelectorAll('.x-content-area[data-item-type="Image"]')
    portList.forEach(function (item) {
        //为了匹配图片，使用图片src作为key值
        var src = item.querySelector('source:nth-child(2)').dataset.srcset
        src = src || ''
        item.insertAdjacentHTML('beforeend', '<div class="action_snap_entry" data-key="' + src + '"></div>')
    })
    // 把配置文件挂载到windo对象下
    window.actionSnapConfig = {
        title: '類似アイテム',
        gaId: 'UA-158934202-4'
    }
    //引入核心库
    function insertReact() {
        var bodyEl = document.querySelector('body');
        var scriptEl = document.createElement("script");
        scriptEl.type = "text/javascript";
        scriptEl.src = "https://api.popin.cc/action_snap/action_snap.js"; //cdn
        // scriptEl.src = "https://s3.amazonaws.com/api.popin.cc/action_snap/action_snap.js"; //直接访问
        bodyEl.appendChild(scriptEl)
    }
    //请求数据
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
    var url = 'https://api-demo-action.popin.cc/test/api/snap/similar'
    //获取地址栏参数
    function getUrlSearch(name) {
        if (!name) return null;
        var after = window.location.search;
        after = after.substr(1);
        if (!after) return null;
        if (after.indexOf(name) === -1) return null;
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = decodeURI(after).match(reg);
        if (!r) return null;
        return r[2];
    }
    var strategy=getUrlSearch('strategy')
    var data = {
        link: location.origin + location.pathname,
        site: 'mery.jp',
        type: 'normal',
        strategy: strategy||'mix.tokyo'//palcloset.jp ragtag.jp random
    }
    ajax({
        url: url,
        data: data,
        success: function (resp) {
            if (resp.message.errMessage === 'success' && resp.content.length !== 0) {
                window.actionSnapData = resp.content
                insertReact()
            }
        }
    })
})()