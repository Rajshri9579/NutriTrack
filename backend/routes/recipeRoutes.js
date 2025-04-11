import express from "express";
import { getRecipes, saveRecipe, getSavedRecipes, getQuickRecipes } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/save", protect, saveRecipe);
router.get("/saved", protect, getSavedRecipes);
router.get("/quick", protect, getQuickRecipes);

export default router;
