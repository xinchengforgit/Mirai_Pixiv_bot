const { Agent } = require("http")

module.exports = {
    headers1: {
        "cookie": "your cookies",
        "user-agent": "your xxxx"
    },
    headers2: {
        "cookie": "your cookies",
        "user-agent": "your xxx",
        "referer": "https://www.pixiv.net/" //缺少这个referer在进入图片页面的时候会403
    },
    baseUrl: "https://www.pixiv.net/ajax/search/artworks/%E5%8F%A4%E6%98%8E%E5%9C%B0%E3%81%93%E3%81%84%E3%81%97%20%E6%9D%B1%E6%96%B9Project1000users%E5%85%A5%E3%82%8A?word=%E5%8F%A4%E6%98%8E%E5%9C%B0%E3%81%93%E3%81%84%E3%81%97%20%E6%9D%B1%E6%96%B9Project1000users%E5%85%A5%E3%82%8A&order=date_d&mode=safe&p=1&s_mode=s_tag&type=all&lang=zh"
}