var Crawler = require("simplecrawler");
(url = require("url")), (cheerio = require("cheerio")), (request = require("request"));

var crawler = Crawler("https://slickdeals.net").on("fetchcomplete", function() {
  console.log("Fetched a resource!");
});

//crawler configs
crawler.interval = 200;
crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
  console.log(
    "I just received %s (%d bytes)",
    queueItem.url,
    responseBuffer.length
  );
  console.log("It was a resource of type %s", response.headers["content-type"]);
});

//start crawler
crawler.start();
