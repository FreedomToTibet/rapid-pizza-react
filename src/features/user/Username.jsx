import { useSelector } from 'react-redux';

const Username = () => {
	const username = useSelector((state) => state.user.username);

	return (
		username && (
			<div className="text-sm font-semibold hidden md:block">
				{username}
			</div>
		)
	)
}

export default Username;
