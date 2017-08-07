// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var keywordsSchema = new Schema({
    keyword: { type: String, unique: true },
    weight: { type: Number, min: -5, max: 5 },
    percentChange: Number,
    timestamps: { createdAt: "created_at" }
});
// we need to create a model using it
var Symbol = mongoose.model("Symbol", symbolSchema);
// make this available to our users in our Node applications
module.exports = Symbol;
//# sourceMappingURL=Keywords.js.map