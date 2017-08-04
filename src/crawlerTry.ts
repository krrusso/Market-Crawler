const request = require("request");
const URL = require("url-parse");
import cheerio = require("cheerio");

var START_URL: string = "http://www.marketwatch.com";
var SEARCH_WORD: string = "stemming";
var MAX_PAGES_TO_VISIT: number = 10;

var pagesVisited: Object = new Object();
var numPagesVisited: number;
var pagesToVisit: Array<any> = new Array();
var url: URL = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);
crawl();

function crawl() {
  if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage: string = pagesToVisit.pop();
  if (pagesVisited.hasOwnProperty(nextPage)) {
    // We've already visited this page, so repeat the crawl
    crawl();
  } else {
    // New page we haven't visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url: string, callback: Function) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error: Error, response: Response, body: any) {
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response);
    if (response.status !== 200) {
      callback();
      return;
    }
    // Parse the document body
    var $ = cheerio.load(body);
    var isWordFound = searchForWord($, SEARCH_WORD);
    if (isWordFound) {
      console.log("Word " + SEARCH_WORD + " found at page " + url);
    } else {
      collectInternalLinks($);
      // In this short program, our callback is just calling crawl()
      callback();
    }
  });
}

function searchForWord($: any, word: string) {
  var bodyText = $("html > body").text().toLowerCase();
  return bodyText.indexOf(word.toLowerCase()) !== -1;
}

function collectInternalLinks($: any) {
  var relativeLinks = $("a[href^='/']");
  console.log("Found " + relativeLinks.length + " relative links on page");
  relativeLinks.each(function() {
    pagesToVisit.push(baseUrl + $(this).attr("href"));
  });
}
