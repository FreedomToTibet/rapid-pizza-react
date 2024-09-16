import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseCart, increaseCart } from "./cartSlice";


const CartItemUpdate = ({ pizzaId }) => {
	const dispatch = useDispatch();
	return (
		<div className="flex gap-1 items-center md:gap-3">
			<Button type="round" onClick={() => dispatch(decreaseCart(pizzaId))}>-</Button>
			<Button type="round" onClick={() => dispatch(increaseCart(pizzaId))}>+</Button>
		</div>
	)
}

export default CartItemUpdate;
