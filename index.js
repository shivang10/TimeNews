const express = require('express');
const app = express();
const request = require('request');
let url = "https://time.com/";

app.get('/', async function (req, res) {
    request.get(url, (_error, _response, body) => {
        let ans = JSON.stringify(body).match(/<ol class(.*?)<\/ol>/g)[0].match(/<a h(.*?)<\/a>/gi).map(i =>
            [
                i.match(/>(.*?)</gi),
                i.match(/href(.*?)\/>/gi)
            ]
        );
        let obj = ans.map(i => {
            return {
                title: i[0][0].substr(1, i[0][0].length - 2),
                link: "https://time.com/" + i[1][0].substr(6, i[1][0].length - 7)
            }
        });
        res.send(obj);
    });
});

app.listen(3000, () => {
    console.log("Server is running");
})