import { crafting } from '../db.json';

const tools = ['Blacksmith Hammer', 'Mining Pick', 'Arclight Spanner', 'Skinning Knife', 'Gyromatic Micro-Adjustor'];

export const fetchMats = (id, type = 'spell') => {
  return fetch(`https://classic.wowhead.com/tooltip/${ type }/${ id }`)
    .then(response => response.json())
    .then((data) => {
      const html = document.createElement('div');
      html.innerHTML = data.tooltip;

      const reagents = Array
        .from(html.querySelectorAll('td>.indent.q1 a'))
        .filter((a) => {
          return tools.reduce(
            (acc, curr) => {
              if (!acc) {
                return acc;
              }

              return a.innerHTML.indexOf(curr) === -1;
            },
            true,
          );
        })
        .map((a) => {
          const id = a.getAttribute('href')?.replace('/item=', '');
          const match = a.nextSibling?.data?.match(/\d+/g);
          if (id) {
            return [id, match && match.length ? +match[0] : 1];
          }
        });

      return reagents.reduce(
        (acc, curr) => {
          const [id, amount] = curr;
          acc[id] = amount;
          return acc;
        },
        {},
      );
    });
};

export const chainPromises = async (arr, promise) => {
  return arr.reduce(
    async (previous, arg) => {
      await previous;
      return promise(arg);
    },
    Promise.resolve(),
  );
};

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