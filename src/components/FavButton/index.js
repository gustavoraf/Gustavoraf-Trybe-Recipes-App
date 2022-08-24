import React, { useState, useEffect } from 'react';

import filledHeart from '../../images/blackHeartIcon.svg';
import emptyHeart from '../../images/whiteHeartIcon.svg';

export default function FavButton({ id, foodObj }) {
  const [localFav, setLocalFav] = useState(false);

  const verifyFavorited = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const newList = favoriteRecipes.filter((element) => element.id !== id);
    if (favoriteRecipes.length > newList) {
      setLocalFav(true);
    }
  };

  const handleFavClick = () => {
    setLocalFav((prevState) => !prevState);
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const newList = [...favoriteRecipes, foodObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  };

  const handleUnfavClick = () => {
    setLocalFav((prevState) => !prevState);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newList = favoriteRecipes.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  };

  const renderButtons = () => {
    if (localFav) {
      return (
        <button
          type="button"
          onClick={ handleUnfavClick }
        >
          <img
            src={ filledHeart }
            alt="coração de favorito preenchido"
            data-testid="favorite-btn"
            className="fav-button"
          />
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={ handleFavClick }
      >
        <img
          data-testid="favorite-btn"
          alt="coração de favorito vazio"
          src={ emptyHeart }
          className="fav-button"
        />
      </button>
    );
  };

  useEffect(() => {
    verifyFavorited();
  }, []);

  return renderButtons();
}
