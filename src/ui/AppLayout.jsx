import { Fragment } from "react";
import { Outlet, useNavigation } from "react-router-dom";

import CartOverview from "../features/cart/CartOverview";

import Loader from "./Loader";
import Header from "./Header";

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="grid grid-row-[auto_1fr_auto] h-screen">
			{isLoading && <Loader />}
			<Header />
			<Fragment className="overflow-scroll">
				<main className="mx-auto max-w-3xl">
					<Outlet />
				</main>
			</Fragment>
			
			<CartOverview />
		</div>
	)
}

export default AppLayout;
