import { crafting } from '../db.json';
import chainPromises from './chain-promises';
import fetchMats from './fetch-mats';

export default async (ids) => {
  const mats = {};

  const addRecipe = async (id) => {
    const recipeId = crafting.recipes[id];
    if (recipeId) {
      const recipe = await fetchMats(recipeId);
      mats[id] = recipe;
      await chainPromises(Object.keys(recipe), addRecipe);
    }
    return Promise.resolve();
  };
  

  await chainPromises(ids, addRecipe);

  return mats;
};