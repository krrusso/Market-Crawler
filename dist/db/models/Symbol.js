"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var symbolSchema = new Schema({
    name: String,
    symbol: { type: String, unique: true },
    price: Number,
    percentChange: Number,
    timestamps: { createdAt: "created_at" }
});
// we need to create a model using it
var Symbol = mongoose.model("Symbol", symbolSchema);
// make this available to our users in our Node applications
exports.default = Symbol;
//# sourceMappingURL=Symbol.js.map