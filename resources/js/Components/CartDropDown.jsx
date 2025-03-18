import { XCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import clsx from "clsx";

export default function CartDropDown({ dropdownOpen, carts }) {
    const { delete: destroy } = useForm();

    const deleteCart = (id) => {
        destroy(route("remove-from-cart", id));
    };

    return (
        <>
            <div
                className={clsx(
                    "absolute z-50 right-0 top-[56px] overflow-hidden bg-white dark:bg-gray-100 shadow-2xl transition-all duration-700 ease-in-out",
                    dropdownOpen === true
                        ? "max-h-[40rem] overflow-y-auto"
                        : "max-h-0"
                )}
            >
                <div className="flex flex-col w-[22rem]">
                    {carts.map((cart) => (
                        <div
                            key={cart.id}
                            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-300"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={cart.image}
                                    alt="product"
                                    className="w-24 h-28 object-cover"
                                />

                                <div className="flex flex-col">
                                    <h3 className="text-base text-gray-800 dark:text-gray-600">
                                        {cart.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-500">
                                        {cart.quantity} x $
                                        {cart.discount
                                            ? (
                                                  cart.price -
                                                  (cart.price * cart.discount) /
                                                      100
                                              ).toFixed(2)
                                            : price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteCart(cart.id)}
                                className="text-gray-600 dark:text-gray-400 pr-2"
                            >
                                <XCircleIcon className="w-10 h-10 text-gray-300 hover:text-gray-400" />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between p-4">
                        <p className="uppercase text-gray-600 text-sm font-medium">
                            Subtotal:
                        </p>
                        <p className="text-gray-600 text-sm font-semibold">
                            ${" "}
                            {carts
                                .reduce(
                                    (total, cart) =>
                                        total +
                                        (cart.discount
                                            ? (
                                                  cart.price -
                                                  (cart.price * cart.discount) /
                                                      100
                                              ).toFixed(2) * cart.quantity
                                            : cart.price * cart.quantity),
                                    0
                                )
                                .toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-between p-4">
                        <button className="bg-gray-500 text-white px-8 py-2 hover:bg-gray-600">
                            View Cart
                        </button>
                        <button className="bg-red-500 text-white px-8 py-2 hover:bg-red-600">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
