const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Load environment variables
// require("dotenv").config();

// const MONGO_URL = process.env.ATLAS_URL;
const MONGO_URL="mongodb+srv://gomsimehani:mehanisonisax@cluster0.mjwqkzj.mongodb.net/"

// console.log("MONGO_URL:", MONGO_URL);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");

    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6531350a2543406980779aae",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
