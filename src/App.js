import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
// import Foods from './pages/Foods';
import Explorer from './pages/Explorer';
import FoodExplorer from './pages/FoodExplorer';
import DrinkExplorer from './pages/DrinkExplorer';
import FoodArea from './pages/FoodArea';
import Profile from './pages/Profile';
import DetailsPage from './pages/DetailsPage';
import MainPage from './pages/MainPage';
import DoneRecipes from './pages/DoneRecipes';
import NotFound from './pages/NotFound';
import IngredientsExplorer from './pages/IngredientsExplorer';
import FavoriteRecipes from './pages/FavoriteRecipes';
// import FoodRecipe from './pages/FoodRecipe';
import ProgressRecipes from './pages/ProgressRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainPage } />
        <Route exact path="/bebidas" component={ MainPage } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <DetailsPage { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DetailsPage { ...props } /> }
        />
        <Route
          path="/comidas/:id/in-progress"
          component={ (props) => <ProgressRecipes { ...props } /> }
        />
        <Route
          path="/bebidas/:id/in-progress"
          component={ (props) => <ProgressRecipes { ...props } /> }
        />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ FoodExplorer } />
        <Route exact path="/explorar/bebidas" component={ DrinkExplorer } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ IngredientsExplorer }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsExplorer }
        />
        <Route path="/explorar/comidas/area" component={ FoodArea } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        {/* <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } /> */}
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
