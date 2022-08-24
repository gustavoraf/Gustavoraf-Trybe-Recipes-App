import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import './CardRenderRecipes.css';

const copy = require('clipboard-copy');

function CardRenderRecipes({ recipes, favoriteButton }) {
  const [hasMessage, setHasMessage] = useState(false);
  // const [copyRecipes, setCopyRecipes] = useState([]);

  function handleClick(recipe) {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setHasMessage(true);
    const TIMER = 1000;
    setHasMessage(true);
    setTimeout(() => {
      setHasMessage(false);
    }, TIMER);
  }

  function ToTurnFavorite(item) {
    const newList = [];
    const getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    getItem.forEach((itemStorage) => {
      if (itemStorage.id !== item.id) {
        newList.push(itemStorage);
      }
    });
    console.log(newList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    window.location.reload();
  }

  function messageCopy(renderMessage) {
    return (
      renderMessage ? (
        <div className={ hasMessage ? 'show-message' : 'hidden-message' }>
          Link copiado!
        </div>
      ) : '');
  }

  function tags(tagNames, ind) {
    if (tagNames) {
      return (
        <div className="tags">
          {tagNames.map((tagName, i) => (i <= 1) && (
            <p
              key={ tagName }
              data-testid={ `${ind}-${tagName}-horizontal-tag` }
              className="tag-name"
            >
              {tagName}
            </p>
          ))}
        </div>
      );
    }
  }

  function topTextRender(item) {
    if (item.type === 'bebida') {
      return item.alcoholicOrNot
        ? `${item.alcoholicOrNot} - ${item.category}`
        : item.alcoholicOrNot;
    }
    return item.area
      ? `${item.area} - ${item.category}`
      : item.category;
  }

  function favoritesRender(recipesReceive) {
    return (
      <div className="main-done-recipes">
        { recipesReceive.map((recipe, index) => (
          <div key={ recipe.id } className="cardItem">
            <div className="image-card">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt="recipe"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div className="content-card">
              <div className="text-card">
                <div className="recipe-category">
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { topTextRender(recipe) }
                  </p>
                </div>
                <Link to={ `/${recipe.type}s/${recipe.id}` } className="recipe-name">
                  <p data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </p>
                </Link>
                { favoriteButton ? ('') : (
                  <div className="recipe-date">
                    <p data-testid={ `${index}-horizontal-done-date` }>
                      { `feita em: ${recipe.doneDate}` }
                    </p>
                  </div>
                )}
                <div className="tags">
                  {tags(recipe.tags, index)}
                </div>
              </div>
              <div className="buttons-card">
                <button
                  type="button"
                  className="share-button"
                  onClick={ () => handleClick(recipe) }
                >
                  <img
                    src={ shareIcon }
                    alt="share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { favoriteButton ? (
                  <button
                    type="button"
                    className="favorite-button"
                    onClick={ () => ToTurnFavorite(recipe) }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="favorite Icon"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>) : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      { favoritesRender(recipes) }
      { messageCopy(hasMessage) }
    </div>
  );
}

CardRenderRecipes.propTypes = {
  favoriteButton: PropTypes.bool,
  recipes: PropTypes.any,
}.isRequired;
export default CardRenderRecipes;
