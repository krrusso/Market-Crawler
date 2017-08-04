const request = require("request");
const URL = require("url-parse");
import cheerio = require("cheerio");

var pageToVisit: string = "http://www.marketwatch.com/";

console.log("Visiting Page " + pageToVisit);

request(pageToVisit, (error: string, response: any, body: any) => {
  if (error) console.log("Kens Error ", error);
  if (response.statusCode === 200) {
    var $ = cheerio.load(body);
    console.log("Page title: ", $("title").text());
  }
});

var searchfForWords = ($: any, word: string): any => {
  var bodyText: any = $("html > body".text());
  if (bodyText.toLowerCase().indexOf(word.toLocaleLowerCase()) !== -1) {
    return true;
  }
  return false;
};

function collectInternalLinks($: any) {
  var allRelativeLinks: Array<string>;
  var allAbsoluteLinks: Array<string>;

  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
    allRelativeLinks.push($(this).attr("href"));
  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
    allAbsoluteLinks.push($(this).attr("href"));
  });

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
