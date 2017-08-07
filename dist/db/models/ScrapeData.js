// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var scrapeDataSchema = new Schema({
    articleTitle: { type: String, unique: true },
    companyName: { type: String, unique: true },
    symbol: { type: String, unique: true },
    opposingSymbols: [],
    listOfKeywords: [],
    aggregate: Number,
    percentChange: Number,
    visitors: Number,
    timestamps: { createdAt: "created_at" }
});
// create a model using the schema
var ScrapeData = mongoose.model("Symbol", scrapeDataSchema);
// make this available to our users in our Node applications
module.exports = ScrapeData;
//# sourceMappingURL=ScrapeData.js.map