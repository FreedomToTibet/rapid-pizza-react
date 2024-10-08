import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

const Header = () => {
	return (
		<header className="bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex items-center justify-around">
			<Link to="/" className="tracking-widest" >Pizza</Link>
			<SearchOrder />
			<Username />
		</header>
	)
}

export default Header;
