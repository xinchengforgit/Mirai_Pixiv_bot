/*用于实现根据TAG来进行搜索图的功能*/
const axios = require("axios");
const config = require("./config.js");
const tunnel = require('tunnel');
const fs = require('fs');
const cheerio = require("cheerio");
const urlencode = require('urlencode');
const agent = tunnel.httpsOverHttp({
    proxy: {
        host: "127.0.0.1",
        port: 10080 //这里是设定你的代理
    }
})//tunnel用于将http的代理转为https的代理,否则axios会报不安全的错
var instance = axios.create({
    headers: config.headers1,

    httpsAgent: agent
})
var instance2 = axios.create({
    headers: config.headers2,
    httpsAgent: agent
})
var str = "搜索恋恋";//测试用str


var baseUrl = 'https://www.pixiv.net/ajax/search/artworks/'


//判定是否搜索到并确定随机的图片
function genUrl(data) {
    var urlData = urlencode(data, 'utf-8');
    var Url = baseUrl + urlData + "?word=" + urlData + "&order=date_d&mode=safe&p=1&s_mode=s_tag&type=all&lang=zh"
    console.log(Url);
    return Url;
}
//判定是否搜索到并确定随机的图片,Url是基础网址,data是tag
async function isSearch(Url, data) {
    let result = await instance.get(Url);
    if (result.data.body.illustManga.total === 0)
        return -1;
    else {
        console.log(result.data.body.illustManga.data.length);
        let page;//这里的page决定了随图获得的页面
        if (result.data.body.illustManga.total <= 60)
            page = 1;
        else {
            // console.log(result.data.body.illustManga.total);
            // console.log(typeof (result.data.body.illustManga.total));
            let totalPage = Math.ceil(result.data.body.illustManga.total / 60);
            page = Math.round(Math.random() * totalPage);//获取一个随机的页面,
        }
        console.log(page);
        let urlData = urlencode(data, 'utf-8');
        Url = baseUrl + urlData + "?word=" + urlData + "&order=date_d&mode=safe&p=" + page + "&s_mode=s_tag&type=all&lang=zh";
        result = await instance.get(Url);
        let num = Math.min(result.data.body.illustManga.data.length, 59);//一面是少于60张的
        var randomNum = Math.round(Math.random() * num);
        console.log(randomNum);
        return result.data.body.illustManga.data[randomNum].id; //返回随机的id
    }
}


//找到那张随机的图片,并保存到本地,参数是搜索的字符串
async function DownLoadImg(Url, data) {
    let realImgId = await isSearch(Url, data);
    if (realImgId == -1)
        return -1;//表示tag搜不到东西;
    else {
        let imgUrl = "https://www.pixiv.net/artworks/" + realImgId;
        console.log(imgUrl);
        let ret = await instance.get(imgUrl);
        var $ = cheerio.load(ret.data);
        var real_img_url;
        $("meta#meta-preload-data").each(function () {
            let data2 = $(this);

            var dataStr = data2.attr().content;
            var obj = JSON.parse(dataStr);

            var illustStr = JSON.stringify(obj.illust)
            illustStr = illustStr.slice(illustStr.indexOf("regular"), illustStr.length - 1);
            real_img_url = illustStr.slice(10, illustStr.indexOf(',"original') - 1);
        });

        console.log('data' + 1 + real_img_url);
        let pic_result = await instance2.get(real_img_url, { responseType: "arraybuffer" });
        let local_path = "D:\\mirai\\data\\net.mamoe.mirai-api-http\\images\\search\\1.png";//我将图片保存在images的search标签下
        fs.writeFile(local_path, pic_result.data, function (err) {
            if (err) throw err;
        });
        return 1;
    }
}

exports.isSearch = isSearch;
exports.DownLoadImg = DownLoadImg;
exports.genUrl = genUrl;

