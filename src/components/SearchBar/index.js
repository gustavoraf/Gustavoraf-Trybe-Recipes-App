import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import fetchAPI from '../../services';
import AppContext from '../../context/AppContext';
import './search-bar.css';

const SearchBar = ({ option }) => {
  const SEARCH_TERM = 'searchTerm';
  const [inputSearch, setInputSearch] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  const { setMeals, setDrinks,
    setDrinkIngredientSituation, setFoodIngredientSituation } = useContext(AppContext);
  const history = useHistory();

  const handleChange = ({ target }) => (target.name === 'searchBar'
    ? setInputSearch(target.value)
    : setInputRadio(target.id));

  const checkResult = (type, response) => {
    const typeToLower = type.toLowerCase();

    if (response === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }

    const drinkOrFood = {
      Bebidas: response[0].idDrink,
      Comidas: response[0].idMeal,
    };

    if (response.length === 1) {
      history.push(`/${typeToLower}/${drinkOrFood[type]}`);
    }
    return type === 'Comidas' ? setMeals(response) : setDrinks(response);
  };

  const searchCriteria = async (searchInput, radio, type) => {
    if (searchInput.length > 1 && radio === 'firstLetter') {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const drinkOrFood = {
      Bebidas: 'thecocktaildb',
      Comidas: 'themealdb',
    };

    const radioCriteria = {
      ingredient: `https://www.${drinkOrFood[type]}.com/api/json/v1/1/filter.php?i=${searchInput}`,
      name: `https://www.${drinkOrFood[type]}.com/api/json/v1/1/search.php?s=${searchInput}`,
      firstLetter: `https://www.${drinkOrFood[type]}.com/api/json/v1/1/search.php?f=${searchInput}`,
    };

    if (type === 'Comidas') {
      setFoodIngredientSituation(false);
      const { meals } = await fetchAPI(radioCriteria[radio]);
      checkResult(type, meals);
    }
    if (type === 'Bebidas') {
      setDrinkIngredientSituation(false);
      const { drinks } = await fetchAPI(radioCriteria[radio]);
      checkResult(type, drinks);
    }
  };

  return (
    <form className="main-container">
      <div className="search-input">
        <Input
          obj={ {
            title: '',
            type: 'text',
            id: 'searchBar',
            dataTestID: 'search-input',
            name: 'searchBar',
            value: inputSearch,
            onChange: handleChange,
            placeholder: `Buscar ${option}`,
          } }
        />
      </div>
      <div className="radios">
        <Input
          obj={ {
            title: 'Ingrediente',
            type: 'radio',
            id: 'ingredient',
            dataTestID: 'ingredient-search-radio',
            name: SEARCH_TERM,
            value: inputRadio,
            onChange: handleChange,
          } }
        />
        <Input
          obj={ {
            title: 'Nome',
            type: 'radio',
            id: 'name',
            dataTestID: 'name-search-radio',
            name: SEARCH_TERM,
            value: inputRadio,
            onChange: handleChange,
          } }
        />
        <Input
          obj={ {
            title: 'Primeira letra',
            type: 'radio',
            id: 'firstLetter',
            dataTestID: 'first-letter-search-radio',
            name: SEARCH_TERM,
            value: inputRadio,
            onChange: handleChange,
          } }
        />
      </div>
      <button
        className="search-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => searchCriteria(inputSearch, inputRadio, option) }
      >
        Buscar
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  option: PropTypes.string.isRequired,
};

export default SearchBar;
