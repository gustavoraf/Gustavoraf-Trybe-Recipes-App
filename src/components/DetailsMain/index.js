import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './detailsMain.css';
import Recommendation from '../Recommendation';
import FavButton from '../FavButton';
import RenderCategory from './RenderCategory';

const DetailsMain = ({ foodType, id, history }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [recommendation, setRecommendation] = useState({});
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [foodObj, setFoodObj] = useState({});
  const [video, setVideo] = useState('');

  const setFoodState = (res) => {
    const food = res.meals[0];
    const currentFood = {
      id,
      type: foodType,
      area: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };
    setFoodObj(currentFood);
    const youtubeLink = food.strYoutube.replace('watch?v=', 'embed/');
    setVideo(youtubeLink);
    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      const key = `strIngredient${i}`;
      const ingredient = [food[key]];
      const key2 = `strMeasure${i}`;
      const measure = [food[key2]];
      if (ingredient[0] !== '') {
        setIngredients((prevState) => [...prevState, ...ingredient]);
        setMeasures((prevState) => [...prevState, ...measure]);
      }
    }
    setInstructions(food.strInstructions);
  };

  const setDrinkState = (res) => {
    const drink = res.drinks[0];
    const currentDrink = {
      id,
      type: foodType,
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    setFoodObj(currentDrink);
    const maxIngredients = 15;
    for (let i = 1; i <= maxIngredients; i += 1) {
      const key = `strIngredient${i}`;
      const ingredient = [drink[key]];
      const key2 = `strMeasure${i}`;
      const measure = [drink[key2]];
      if (ingredient[0] !== null) {
        setIngredients((prevState) => [...prevState, ...ingredient]);
        setMeasures((prevState) => [...prevState, ...measure]);
      }
    }
    setInstructions(drink.strInstructions);
  };

  const fetchDetails = async () => {
    if (foodType === 'comida') {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json());
      const res2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json());
      setFoodState(res);
      const recAmount = 6;
      setRecommendation(res2.drinks.slice(0, recAmount));
    } else {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json());
      const res2 = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json());
      setDrinkState(res);
      const recAmount = 6;
      setRecommendation(res2.meals.slice(0, recAmount));
    }
    setLoading(false);
  };

  const handleBeginClick = () => {
    const path = `${history.location.pathname}/in-progress`;
    history.push(path);
  };

  const handleShareClick = () => {
    const { pathname } = history.location;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setLinkCopied(true);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div>
        loading...
      </div>
    );
  }

  const altText = `Foto do ${foodObj.name}`;
  return (
    <div className="main">
      <div>
        <h1 data-testid="recipe-title">{ foodObj.name }</h1>
      </div>
      <div>
        <RenderCategory
          foodType={ foodType }
          foodMessage={ foodObj.category }
          drinkMessage={ foodObj.alcoholicOrNot }
        />
      </div>
      <div>
        <img
          src={ foodObj.image }
          alt={ altText }
          data-testid="recipe-photo"
          className="img"
        />
      </div>
      <div>
        <ul>
          { ingredients.map((ingredient, index) => {
            const testid = `${index}-ingredient-name-and-measure`;
            const ingredientText = `${ingredient} / ${measures[index]}`;
            return (
              <li
                key={ ingredient }
                data-testid={ testid }
              >
                { ingredientText }
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p data-testid="instructions">{ instructions }</p>
      </div>
      <div>
        <iframe
          title="Instruction Video"
          width="355px"
          height="300px"
          src={ video }
          data-testid="video"
        />
      </div>
      <FavButton id={ id } foodObj={ foodObj } />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        { linkCopied ? 'Link copiado!' : 'Share'}
      </button>
      <div>
        <Recommendation foodType={ foodType } recommendation={ recommendation } />
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleBeginClick }
        className="begin-button"
      >
        Começar Receita
      </button>
    </div>
  );
};

DetailsMain.propTypes = {
  foodType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsMain;
