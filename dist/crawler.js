"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var URL = require("url-parse");
var cheerio = require("cheerio");
var pageToVisit = "http://www.marketwatch.com/";
console.log("Visiting Page " + pageToVisit);
request(pageToVisit, function (error, response, body) {
    if (error)
        console.log("Kens Error ", error);
    if (response.statusCode === 200) {
        var $ = cheerio.load(body);
        console.log("Page title: ", $("title").text());
    }
});
var searchfForWords = function ($, word) {
    var bodyText = $("html > body".text());
    if (bodyText.toLowerCase().indexOf(word.toLocaleLowerCase()) !== -1) {
        return true;
    }
    return false;
};
function collectInternalLinks($) {
    var allRelativeLinks;
    var allAbsoluteLinks;
    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function () {
        allRelativeLinks.push($(this).attr("href"));
    });
    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function () {
        allAbsoluteLinks.push($(this).attr("href"));
    });
    console.log("Found " + allRelativeLinks.length + " relative links");
    console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
//# sourceMappingURL=crawler.js.map