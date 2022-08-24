import React from 'react';
import PropTypes from 'prop-types';

export default function Recommendation({ foodType, recommendation }) {
  const renderRecommendation = (item, index) => {
    const dataTestId = `${index}-recomendation-card`;
    const dataTestId2 = `${index}-recomendation-title`;
    const { strMeal } = item;
    if (foodType === 'comida') {
      const { strDrink } = item;
      return (
        <div
          data-testid={ dataTestId }
          key={ item.idDrink }
          className="recommendation-box"
        >
          <img
            alt="recomendação"
            src={ item.strDrinkThumb }
            className="recommendation-image"
          />
          <p data-testid={ dataTestId2 }>{ `${strDrink}` }</p>
        </div>
      );
    }
    return (
      <div
        data-testid={ dataTestId }
        key={ item.idMeal }
        className="recommendation-box"
      >
        <img
          alt="recomendação"
          src={ item.strMealThumb }
          className="recommendation-image"
        />
        <p data-testid={ dataTestId2 }>{ `${strMeal}` }</p>
      </div>
    );
  };
  return (
    <div className="recommendation-area">
      { recommendation.map(renderRecommendation) }
    </div>
  );
}

Recommendation.propTypes = {
  foodType: PropTypes.string.isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
