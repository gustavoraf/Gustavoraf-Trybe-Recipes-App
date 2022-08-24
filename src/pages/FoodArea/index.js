import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fetchAPI from '../../services';

export default function FoodArea() {
  const [areaOptions, setAreaOptions] = useState([]);
  const [areaFoods, setAreaFoods] = useState([]);
  const [filterArea, setFilterArea] = useState('');

  // pegando as areas
  useEffect(() => {
    async function getAreaOptions() {
      const foods = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setAreaOptions(foods.meals);
      // console.log(foods.meals);
    }
    getAreaOptions();
  }, []);

  // filtrando comidas
  useEffect(() => {
    async function getFoods(filter) {
      const foods = await fetchAPI(filter ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterArea}`);
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      // usando slice para captar uma copia do array com posição inicial e final
      const TWELVE = 12;
      setAreaFoods(foods.meals.slice(0, TWELVE));
    }
    getFoods(filterArea === '');
  }, [filterArea]);

  // handleChange = (({ target }) => setFilterArea(target.value === 'All' ? '' : target.value));

  return (
    <div>
      <Header searchRender titlePage="Explorar Origem" />
      <select
        name="areaDropdown"
        data-testid="explore-by-area-dropdown"
        // https://stackoverflow.com/questions/54422696/in-react-hook-no-e-target-in-handlechange-with-setvalue
        // uma forma de fazer handle change diretamente no onChange
        onChange={ ({ target }) => {
          setFilterArea(target.value === 'All' ? '' : target.value);
        } }
      >
        <option value="All" data-testid="All-option">
          All
        </option>
        {areaOptions.map(({ strArea }) => (
          <option value={ strArea } key={ strArea } data-testid={ `${strArea}-option` }>
            {strArea}
          </option>
        ))}
      </select>
      {areaFoods.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${idMeal}` }>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
          </Link>
        </div>
      ))}
      <Footer />
    </div>
  );
}
