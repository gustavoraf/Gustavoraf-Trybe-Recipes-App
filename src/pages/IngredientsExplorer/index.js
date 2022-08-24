import React from 'react';
import { useHistory } from 'react-router';
import IngredientsMenu from '../../components/IngredientsMenu';

export default function IngredientsExplorer() {
  const history = useHistory();

  return (history.location.pathname.includes('/comidas') ? (
    <IngredientsMenu route="Comidas" />
  ) : (
    <IngredientsMenu route="Bebidas" />
  )
  );
}
