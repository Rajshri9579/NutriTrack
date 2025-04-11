import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  calories: Number,
  quickRecipe: Boolean
});

export default mongoose.model("Recipe", recipeSchema);

