import {useLoaderData} from 'react-router-dom';
import {getMenu} from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

const Menu = () => {
  const menu = useLoaderData();
	const pizzas = menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza} />);

  return (
    <ul className="divide-y divide-stone-200 px-2">
			{pizzas}
		</ul>
  );
};

export default Menu;

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};
