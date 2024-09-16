import { useMemo } from 'react';
import {useLoaderData} from 'react-router-dom';
import {getMenu} from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

const Menu = () => {
  const menu = useLoaderData();
	const pizzas = useMemo(() => menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza} />), [menu]);

  return (
    <ul className="divide-y divide-stone-200 px-2">
			{pizzas}
		</ul>
  );
};

export default Menu;

let menuCache = null;

export const loader = async () => {
  if (!menuCache) {
    menuCache = await getMenu();
  }
  return menuCache;
};
