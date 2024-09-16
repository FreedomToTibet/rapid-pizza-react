import LinkButton from '../../ui/LinkButton';

function EmptyCart({ username }) {
  return (
    <div className="px-4 py-3">
			<LinkButton to="/menu">&larr; Back to menu</LinkButton>
			<h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
			<p className="mt-3">Your cart is empty.</p>
		</div>
  );
}

export default EmptyCart;
