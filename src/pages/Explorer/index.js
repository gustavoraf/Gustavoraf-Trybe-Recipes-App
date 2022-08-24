import React from 'react';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Explorer.css';

export default function Explorer() {
  return (
    <div>
      <Header searchRender={ false } titlePage="Explorar" />
      <div className="explorer-buttons">
        <Link to="/explorar/comidas">
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
