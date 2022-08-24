export default async function fetchAPI(url) {
  const response = await fetch(url).then((res) => res.json());
  return response;
}

export const emptyNullKiller = (keyToSearch, object) => Object.entries(object)
  .filter((item) => item[1] !== null)
  .filter((item) => item[1] !== '')
  .filter((item) => item[0].includes(keyToSearch))
  .map((item) => item[1]);

export const mealOrCocktail = (type) => (type === 'comida' ? 'meals' : 'cocktails');

export const getDataFromLocalStorage = () => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');

  return inProgressRecipes
    ? JSON.parse(inProgressRecipes)
    : {
      meals: {},
      cocktails: {},
    };
};

export const setDataToLocalStorage = (inProgressRecipes) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const clearLocalStorage = (type, id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  delete inProgress[mealOrCocktail(type)][id];
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify(inProgress),
  );
};
