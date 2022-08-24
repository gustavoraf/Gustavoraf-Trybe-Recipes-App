import React from 'react';
import PropTypes from 'prop-types';
import DetailsMain from '../../components/DetailsMain';

const DetailsPage = ({ match, history }) => {
  const { params, path } = match;
  const charactersIndex = 6;
  const foodType = path.substr(1, charactersIndex);
  return (
    <DetailsMain id={ params.id } foodType={ foodType } history={ history } />
  );
};

DetailsPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsPage;
