//mongoDB連線
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://fantaski-new:${process.env.MONGODB_PASSWORD}@cluster0.bfytc.mongodb.net/sample_mflix
?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run(action) {
  try {
    await client.connect();
    //GET DATA
    if (action === "read") {
      const database = client.db("sample_mflix");
      const movies = database.collection("movies");

      // Query for a movie that has the title 'Back to the Future'
      const query = { title: "Back to the Future" };
      const movie = await movies.findOne(query);

      console.log(movie);
      //INSERT DATA
    } else if (action === "insert") {
      const database = client.db("testDB");
      const foods = database.collection("foods");
      // create an array of documents to insert
      const docs = [
        { name: "cake", healthy: false },
        { name: "lettuce", healthy: true },
        { name: "donut", healthy: false },
      ];
      // this option prevents additional documents from being inserted if one fails
      const options = { ordered: true };
      const result = await foods.insertMany(docs, options);
      console.log(`${result.insertedCount} documents were inserted`);
      //UPDATE DATA
    } else if (action === "update") {
      const database = client.db("sample_mflix");
      const movies = database.collection("movies");
      // create a filter to update all movies with a 'G' rating
      const filter = { rated: "G" };
      // increment every document matching the filter with 2 more comments
      const updateDoc = {
        $set: {
          random_review: `After viewing I am ${
            100 * Math.random()
          }% more satisfied with life.`,
        },
      };
      const result = await movies.updateMany(filter, updateDoc);
      console.log(`Updated ${result.modifiedCount} documents`);
      //REPLACE DATA(將整個資料取代---舊資料如果沒有在新資料理將不保留)
    } else if (action === "replace") {
      const database = client.db("sample_mflix");
      const movies = database.collection("movies");
      // create a query for a movie to update
      const query = { title: { $regex: "The Cat from" } };
      // create a new document that will be used to replace the existing document
      const replacement = {
        title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
      };
      const result = await movies.replaceOne(query, replacement);
      console.log(`Modified ${result.modifiedCount} document(s)`);
      //DELETE DATA
    } else if (action === "delete") {
      const database = client.db("sample_mflix");
      const movies = database.collection("movies");
      // Query for all movies with a title containing the string "Santa"
      const query = { title: { $regex: "Santa" } };
      const result = await movies.deleteOne(query);
      console.log("Deleted " + result.deletedCount + " documents");
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

let mongoConnection = run("delete").catch(console.dir);
module.exports = mongoConnection;
