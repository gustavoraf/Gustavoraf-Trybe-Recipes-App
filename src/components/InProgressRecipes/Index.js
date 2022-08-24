import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavButton from '../FavButton';
import RenderCategory from './RenderCategory';
import './inProgressRecipes.css';
import {
  emptyNullKiller,
  getDataFromLocalStorage,
  mealOrCocktail,
  setDataToLocalStorage,
} from '../../services';

const InprogressRecipes = ({ foodType, id, history }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [foodObj, setFoodObj] = useState({});
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState();

  const setObjectState = (apiData, typeObj) => {
    const drinkOrFood = {
      comida: apiData.meals,
      bebida: apiData.drinks,
    };
    const obj = drinkOrFood[typeObj][0];
    const currentObj = {
      id,
      type: typeObj,
      area: obj.strArea || '',
      category: obj.strCategory,
      alcoholicOrNot: obj.strAlcoholic || '',
      name: typeObj === 'comida' ? obj.strMeal : obj.strDrink,
      image: typeObj === 'comida' ? obj.strMealThumb : obj.strDrinkThumb,
    };
    setFoodObj(currentObj);
    const ingredient = emptyNullKiller('strIngredient', obj);
    const measure = emptyNullKiller('strMeasure', obj);
    setIngredients((prevState) => [...prevState, ...ingredient]);
    setMeasures((prevState) => [...prevState, ...measure]);
    setInstructions(obj.strInstructions);
  };

  const smartFetch = async () => {
    setLoading(true);
    const domain = {
      bebida: 'thecocktaildb',
      comida: 'themealdb',
    };
    const URL = `https://www.${domain[foodType]}.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(URL).then((response) => response.json());
    setObjectState(result, foodType);
    setLoading(false);
  };

  const handleCheckClick = ({ target }) => {
    const isChecked = target.checked;
    if (isChecked) {
      setIngredientsCheck([...ingredientsCheck, target.id]);
    } else {
      setIngredientsCheck(
        ingredientsCheck.filter((ingredient) => ingredient !== target.id),
      );
    }
  };

  const handleDoneClick = () => {
    console.log(foodObj);
    const recipesDone = [...doneRecipes, foodObj];
    localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    history.push('/receitas-feitas');
  };

  const handleShareClick = () => {
    const { pathname } = history.location;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setLinkCopied(true);
  };

  useEffect(() => {
    smartFetch();
    const inProgressRecipes = getDataFromLocalStorage();
    const dataFromLocalStorage = inProgressRecipes[mealOrCocktail(foodType)][id] || [];
    setIngredientsCheck(dataFromLocalStorage);

    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(doneRecipesStorage);
  }, []);

  useEffect(() => {
    const inProgressRecipes = getDataFromLocalStorage();
    inProgressRecipes[mealOrCocktail(foodType)][id] = ingredientsCheck;
    setDataToLocalStorage(inProgressRecipes);
  }, [foodType, id, ingredientsCheck]);

  if (loading) {
    return <div>loading...</div>;
  }

  const altText = `Foto do ${foodObj.name}`;
  return (
    <div className="main">
      <div>
        <h1 data-testid="recipe-title">{foodObj.name}</h1>
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

      <div className="ingredients">
        {ingredients.map((ingredient, index) => {
          const testid = `${index}-ingredient-step`;
          const ingredientText = `${ingredient} - ${measures[index]}`;
          const isChecked = ingredientsCheck.includes(`${index}`);
          return (
            <div key={ index } data-testid={ testid }>
              <input
                type="checkbox"
                id={ index }
                name={ `ingredient${index}` }
                onChange={ handleCheckClick }
                checked={ isChecked }
              />
              <label
                htmlFor={ index }
                id={ index }
                className={ isChecked ? 'checked' : '' }
              >
                {ingredientText}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{instructions}</p>
      </div>
      <FavButton id={ id } foodObj={ foodObj } />
      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        {linkCopied ? 'Link copiado!' : 'Share'}
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleDoneClick }
        className="begin-button"
        disabled={ ingredients.length !== ingredientsCheck.length }
      >
        Finalizar Receita
      </button>
    </div>
  );
};

InprogressRecipes.propTypes = {
  foodType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InprogressRecipes;
