import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import RecipesMenu from '../../components/RecipesMenu';
import AppContext from '../../context/AppContext';
import fetchAPI from '../../services';

const FOOD_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_CATEGORIES_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export default function MainPage() {
  const history = useHistory();
  const { currentFoodFilter, currentDrinkFilter,
    meals, drinks, setMeals, setDrinks,
    filteredByIngredient, foodIngredientSituation,
    drinkIngredientSituation } = useContext(AppContext);

  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    async function getMealsAndCategories() {
      const foodCategoriesResponse = await fetchAPI(FOOD_CATEGORIES_ENDPOINT);
      setMealsCategories(foodCategoriesResponse.meals);
      const drinkCategoriesResponse = await fetchAPI(DRINK_CATEGORIES_ENDPOINT);
      setDrinksCategories(drinkCategoriesResponse.drinks);
      const foodResponse = await fetchAPI(FOOD_ENDPOINT);
      setMeals(foodResponse.meals);
      const drinkResponse = await fetchAPI(DRINK_ENDPOINT);
      setDrinks(drinkResponse.drinks);
    }
    getMealsAndCategories();
  }, [setDrinks, setMeals]);

  useEffect(() => {
    async function getMeals() {
      const foodResponse = await fetchAPI(FOOD_ENDPOINT);
      setMeals(foodResponse.meals);
    }
    async function getFilteredMeals(categoryName) {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((res) => res.json());
      setMeals(response.meals);
    }
    if (currentFoodFilter === '') {
      getMeals();
    }
    if (currentFoodFilter !== '') {
      getFilteredMeals(currentFoodFilter);
    }
  }, [setMeals, currentFoodFilter]);

  useEffect(() => {
    async function getDrinks() {
      const drinkResponse = await fetchAPI(DRINK_ENDPOINT);
      setDrinks(drinkResponse.drinks);
    }
    async function getFilteredDrinks(categoryName) {
      const response = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((res) => res.json());
      setDrinks(response.drinks);
    }
    if (currentDrinkFilter === '') {
      getDrinks();
    }
    if (currentDrinkFilter !== '') {
      getFilteredDrinks(currentDrinkFilter);
    }
  }, [setDrinks, currentDrinkFilter]);

  function handleIngredientSituationMeals() {
    if (foodIngredientSituation === true) {
      return (
        <RecipesMenu
          route="Comidas"
          array={ filteredByIngredient }
          arrayCategories={ mealsCategories }
        />
      );
    }
    return (
      <RecipesMenu route="Comidas" array={ meals } arrayCategories={ mealsCategories } />
    );
  }

  function handleIngredientSituationDrinks() {
    if (drinkIngredientSituation === true) {
      return (
        <RecipesMenu
          route="Bebidas"
          array={ filteredByIngredient }
          arrayCategories={ drinksCategories }
        />
      );
    }
    return (
      <RecipesMenu
        route="Bebidas"
        array={ drinks }
        arrayCategories={ drinksCategories }
      />
    );
  }

  return (history.location.pathname.includes('/comidas')
    ? handleIngredientSituationMeals()
    : handleIngredientSituationDrinks()
  );
}
