const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/noobboarddb"
);

const postSeed = [
    {
        id: 1,
        title: "git cheat sheet",
        body: "assd asdas asdas asda d"
    },
    {
        id: 2,
        title: "css help",
        body: "jvnckjv civjus wiuef  shbv"
    },
    {
        id: 3,
        title: "react props",
        body: "awe iuf aosdio  iudfo iasdfi chifld asoidf"
    }
]

db.Post
    .remove({})
    .then(() => db.Post.collection.insertMany(postSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
