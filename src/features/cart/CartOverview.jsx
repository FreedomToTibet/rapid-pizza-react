import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getHowManyPizzas, getTotalPrice } from './cartSlice';
import { formatCurrency } from "../../utils/helpers";

const CartOverview = () => {
	const howManyPizzas = useSelector(getHowManyPizzas);
	const totalPrice = useSelector(getTotalPrice);

  return (
    howManyPizzas ? (<div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between" >
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6" >
        <span>{howManyPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>) : null
  );
}

export default CartOverview;
