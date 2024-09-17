import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import { getCart, clearCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../../features/user/userSlice";

// Order #6KLHYJ status
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const CreateOrder = () =>{
	const [withPriority, setWithPriority] = useState(false);

	const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user);
	const isLoadingAddress = addressStatus === "loading";

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	
	const formErrors = useActionData();

	const dispatch = useDispatch();
  const cart = useSelector(getCart);
	const priorityPrice = withPriority ? 10 : 0;
	const totalCartPrice = useSelector(getTotalPrice);
	const totalPrice = totalCartPrice + priorityPrice;

  return cart.length ? (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
							defaultValue={address}
							desabled={isLoadingAddress}
              required
            />
          </div>
					{addressStatus === "error" && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 absolute right-24 top-10 z-10">
              {errorAddress}
            </p>
          )}
          {!position.latitude && !position.longtitude && (<span className="absolute right-1 z-10">
            <Button 
							type="small" 
							desabled={isLoadingAddress} 
							onClick={(e) => {
								e.preventDefault();
								dispatch(fetchAddress())
							}}>
              Geolocation
            </Button>
          </span>)}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input name="cart" type="hidden" value={JSON.stringify(cart)} />
          <input name="position" type="hidden" value={position.latitude && position.longtitude ? `&{position.latitude},&{position.longtitude}` : ""} />

          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default CreateOrder;

export const action = async ({request}) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		customer: data.customer,
		phone: data.phone,
		address: data.address,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};

	const errors = {};
	if(!isValidPhone(order.phone)){
		errors.phone = "Invalid phone number";
	}

	if(Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
};