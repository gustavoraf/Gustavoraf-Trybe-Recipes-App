import React from 'react';
import PropTypes from 'prop-types';

export default function RenderCategory({ foodType, drinkMessage, foodMessage }) {
  return (
    <h2 data-testid="recipe-category">
      { foodType === 'comida' ? foodMessage : drinkMessage }
    </h2>
  );
}

RenderCategory.propTypes = {
  foodType: PropTypes.string.isRequired,
  drinkMessage: PropTypes.string.isRequired,
  foodMessage: PropTypes.string.isRequired,
};
