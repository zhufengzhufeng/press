module.exports = {
    title: 'zhu-ui', // 设置网站标题
    description: 'ui 库', //描述
    dest: './build', // 设置输出目录
    base:'/press/',
    port: 1234, //端口
    themeConfig: { //主题配置
        nav: [{
                text: '主页',
                link: '/'
            }, // 导航条
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/components':[
                {
                   title:'Basic',
                   collapsable: false,
                   children:[
                       '/components/basic/layout',
                       '/components/basic/container',
                       '/components/basic/button',
                       '/components/basic/icon',
                   ],
                   
               },
               {
                    title:'Form',
                    collapsable: false,
                    children:[
                        '/components/form/input',
                        '/components/form/switch',
                        '/components/form/upload',
                        '/components/form/datepicker'
                    ],
                },{
                    title:'Data',
                    collapsable: false,
                    children:[
                        '/components/data/progress',
                        '/components/data/table',
                    ],
                },{
                    title:'others',
                    collapsable: false,
                    children:[
                        '/components/others/infinitescroll',
                        '/components/others/popover',
                        '/components/others/carousel'
                    ],
                }
            ],
        }
    }
}