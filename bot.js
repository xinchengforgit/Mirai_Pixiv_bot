const { Bot, Message } = require('mirai-js');
const { send } = require('process');
const { Middleware } = require('mirai-js')
const bot = new Bot();
const middleware = new Middleware();
const tag = require("./tag.js");
var isSearch = tag.isSearch;
var genUrl = tag.genUrl;
var DownLoadImg = tag.DownLoadImg;
//
async function init() {
    await bot.open({
        baseUrl: "http://127.0.0.1:8080",//启动mirai的地址
        authKey: xxxxxxx,//你的authKey
        qq: 123456//你的qq
    });

}
init();

bot.on('GroupMessage', async data => {
    let textStr = data.messageChain[1].text;
    if (textStr.indexOf("搜索") != -1) {
        let searchTag = textStr.slice(2,);//获取搜索的tag
        console.log(searchTag);
        let generateUrl = genUrl(searchTag);//找到生成的Url
        let value = await DownLoadImg(generateUrl, searchTag);
        if (value == -1) {
            await bot.sendMessage({
                group: data.sender.group.id,
                message: new Message().addText("你所要找的标签未能搜索到东西哦!"),
            });
        }
        else {
            await bot.sendMessage({
                group: data.sender.group.id,
                message: new Message().addImagePath('./search//1.png')//
            })
        }
    }
})

