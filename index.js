const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async (db) => {
    try {
      const createdRecipes = await Recipe.create(data);
      console.log(createdRecipes);
      for (let oneRecipe of createdRecipes) {
        console.log(oneRecipe.title);
      }

      const insertedRecipe = await Recipe.insertMany(data);
      console.log(insertedRecipe);

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log(updatedRecipe);

      const deletedRecipe = await Recipe.deleteOne({
        title: "Carrot Cake",
      });
      console.log(`Carrot cake is not available ${deletedRecipe}`);
    } catch (error) {
      console.error("Error connecting to the database", error);
    } finally {
      mongoose.connection.close();
    }
  });
