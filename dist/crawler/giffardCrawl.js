var Crawler = require("simplecrawler");
var crawler = Crawler(
  "http://172.16.21.55:1337/"
).on("fetchcomplete", function() {
  console.log("Fetched a resource!");
});

//crawler configs
crawler.interval = 35;
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
