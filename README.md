# Mirai_Pixiv_bot
学了node.js的个人练手娱乐项目

#### 如何使用

###### 1.首先启动mirai-api-http

传送门https://github.com/project-mirai/mirai-api-http,

注意通过mcl启动的mirai-api-http的版本只有1.x,所以需要指定低版本的mcl，否则会不兼容，详情见https://github.com/iTXTech/mirai-console-loader/blob/master/scripts/README.md

##### 2.启动bot

首先需要配置bot.js中空缺的authkey,qq号部分,然后命令行输入node bot.js启动bot服务,此外由于直接爬pixiv需要挂上代理，故需要填写你的代理地址和port

其次需要配置config.js中http headers所欠缺的部分来用你自己的账号爬图

###### 3.随机图片

在任意qq群中输入搜索+上你所需要的tag即可随机图片，注:不会随出不能发送的图(





