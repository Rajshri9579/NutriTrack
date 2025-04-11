import Recipe from "../models/Recipe.js";
import User from "../models/userModel.js";

export const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

export const saveRecipe = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { recipeId } = req.body;

  if (!user.savedRecipes.includes(recipeId)) {
    user.savedRecipes.push(recipeId);
    await user.save();
  }

  res.json({ message: "Recipe saved" });
};

export const getSavedRecipes = async (req, res) => {
  const user = await User.findById(req.user.id).populate("savedRecipes");
  res.json(user.savedRecipes);
};

export const getQuickRecipes = async (req, res) => {
  const recipes = await Recipe.find({ quickRecipe: true });
  res.json(recipes);
};
