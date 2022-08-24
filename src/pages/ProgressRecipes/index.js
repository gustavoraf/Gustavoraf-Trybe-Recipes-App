import React from 'react';
import PropTypes from 'prop-types';
import InProgressRecipes from '../../components/InProgressRecipes/Index';

const ProgressRecipes = ({ match, history }) => {
  const { params, path } = match;
  const charactersIndex = 6;
  const foodType = path.substr(1, charactersIndex);
  return (
    <InProgressRecipes id={ params.id } foodType={ foodType } history={ history } />
  );
};

ProgressRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProgressRecipes;
