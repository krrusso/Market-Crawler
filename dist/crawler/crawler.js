"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var URL = require("url-parse");
var cheerio = require("cheerio");
var START_URL = "https://www.bloomberg.com/markets";
var SEARCH_WORD = "rise";
var MAX_PAGES_TO_VISIT = 15;
var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
pagesToVisit.push(START_URL);
crawl();
function crawl() {
    if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
        console.log("Reached max limit of number of pages to visit.");
        return;
    }
    var nextPage = pagesToVisit.pop();
    if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
    }
    else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
    }
}
function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;
    // Make the request
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        // Parse the document body
        var $ = cheerio.load(body);
        var isWordFound = searchForWord($, SEARCH_WORD);
        if (isWordFound) {
            console.log("Word " + SEARCH_WORD + " found at page " + url);
        }
        else {
            collectInternalLinks($);
            // In this short program, our callback is just calling crawl()
            callback();
        }
    });
}
function searchForWord($, word) {
    var bodyText = $("html > body").text().toLowerCase();
    return bodyText.indexOf(word.toLowerCase()) !== -1;
}
function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function () {
        pagesToVisit.push(baseUrl + $(this).attr("href"));
    });
}
//# sourceMappingURL=crawler.js.map