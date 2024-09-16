import { formatCurrency } from "../../utils/helpers";
import CartItemUpdate from "./CartItemUpdate";
import CartItemDelete from "./CartItemDelete";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li key={pizzaId} className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
				<CartItemUpdate pizzaId={pizzaId} />
        <CartItemDelete pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
