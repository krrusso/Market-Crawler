"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var keywordSchema = new Schema({
    keyword: { type: String, unique: true },
    weight: { type: Number, min: -5, max: 5 },
    frequency: Number,
    precedingFiveWords: String,
    followingFiveWords: String,
    percentChange: Number,
    timestamps: { createdAt: "created_at" }
});
// we need to create a model using it
var Keyword = mongoose.model("Keyword", keywordSchema);
exports.default = Keyword;
//# sourceMappingURL=Keyword.js.map