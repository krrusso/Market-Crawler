// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var siteListSchema = new Schema({
  articleTitle: { type: String, unique: true },
  weight: { type: Number, min: 1, max: 5 },
  visitors: Number
});

// we need to create a model using it
var SiteList = mongoose.model("SiteList", siteListSchema);

// make this available to our users in our Node applications
export default SiteList;
