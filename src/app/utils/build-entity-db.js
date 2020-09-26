import { crafting } from '../db.json';

const tools = ['Blacksmith Hammer', 'Mining Pick', 'Arclight Spanner', 'Skinning Knife', 'Gyromatic Micro-Adjustor'];

export const fetchEntity = (id, type) => {
  const { dividers } = crafting;

  return fetch(`https://classic.wowhead.com/tooltip/${ type }/${ id }`)
    .then(response => response.json())
    .then(({ tooltip, icon } = {}) => {
      const html = document.createElement('div');
      const entity = { icon }
      if (tooltip) {
        html.innerHTML = tooltip;
        entity.reagents = Array
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
          })
          .reduce(
            (acc, curr) => {
              const [id, amount] = curr;
              acc[id] = amount;
              return acc;
            },
            {},
          );
      }

      entity.divider = dividers[id] || 1;

      return entity;
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
  const entities = {};
  const { recipes } = crafting;

  const addRecipe = async (id) => {
    if (!entities[id]) {
      const recipeId = recipes[id];
      if (recipeId) {
        const recipe = await fetchEntity(recipeId, 'spell');
        if (recipe) {
          entities[id] = recipe;
          await chainPromises(Object.keys(recipe.reagents), addRecipe);
        }
      } else if (!entities[id]) {
        const item = await fetchEntity(id, 'item');
        entities[id] = item;
      }
    }
    return Promise.resolve();
  };

  await chainPromises(ids, addRecipe);

  return entities;
};