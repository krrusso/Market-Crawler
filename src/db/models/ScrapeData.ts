// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var scrapeDataSchema = new Schema({
  articleTitle: { type: String, unique: true },
  companyName: { type: String, unique: true }, // could generate the symbol
  symbol: { type: String, unique: true }, // could come from the companyname
  opposingSymbols: [], // should have some association
  listOfKeywords: [],
  aggregate: Number, // should be getter method
  percentChange: Number, // should be getter method
  visitors: Number, // if available
  timestamps: { createdAt: "created_at" }
});

// create a model using the schema
var ScrapeData = mongoose.model("Symbol", scrapeDataSchema);

export default ScrapeData;
