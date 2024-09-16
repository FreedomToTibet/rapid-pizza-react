import { Outlet, useNavigation } from "react-router-dom";

import CartOverview from "../features/cart/CartOverview";

import Loader from "./Loader";
import Header from "./Header";

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="grid h-screen grid-rows-[5rem_1fr_auto] scrollbar-hide">
			{isLoading && <Loader />}
			<Header />
			<div className="overflow-y-scroll scrollbar-hide">
				<main className="mx-auto max-w-3xl">
					<Outlet />
				</main>
			</div>
			
			<CartOverview />
		</div>
	)
}

export default AppLayout;