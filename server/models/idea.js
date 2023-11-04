const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const IdeaSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        response: String,
        created: Date,
        user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
);

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = { Idea };
