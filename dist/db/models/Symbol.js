// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var symbolSchema = new Schema({
    name: String,
    symbol: { type: String, unique: true },
    price: Number,
    percentChange: Number,
    created_at: Date,
    updated_at: Date
});
// the schema is useless so far
// we need to create a model using it
var Symbol = mongoose.model("Symbol", symbolSchema);
// make this available to our users in our Node applications
module.exports = Symbol;
//# sourceMappingURL=Symbol.js.map