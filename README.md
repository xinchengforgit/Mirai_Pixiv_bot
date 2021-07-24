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

###### 4.没有弄package.json(

因为一开始写的时候没有注意(,所以就缺什么npm install什么吧2333,注意mirai-js需要 npm install mirai-js@1
mirai-js的文档界面见https://drincann.github.io/Mirai-js/#/v1.x/QuickStart





###### ps:

由于本人水平有限,在随机图片的过程中为了确保不每次都随机出首页的图片，所有需要多一次http请求来获取该标签的所有图片个数，故随图的时间会很慢，权当娱乐练手项目(



