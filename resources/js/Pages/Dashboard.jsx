import CartDropDown from "@/Components/CartDropDown";
import NotFound from "@/Components/NotFound";
import ProductCard from "@/Components/ProductCard";
import SearchItems from "@/Components/SearchItems";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ products, carts }) {
    const [cardHover, setCardHover] = useState(false);

    console.log(products);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>

                    <SearchItems route="dashboard" searchTerm="search" />

                    <div
                        onMouseOver={() => setCardHover(true)}
                        onMouseOut={() => setCardHover(false)}
                        className="relative"
                    >
                        <ShoppingCartIcon className="w-6 h-6 text-gray-800 hover:text-red-500 dark:text-gray-200" />
                        <span className="absolute -bottom-3 -right-2 ml-2 text-gray-800 text-sm dark:text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                            {carts.length}
                        </span>

                        {
                            <CartDropDown
                                dropdownOpen={cardHover}
                                setDropdownOpen={setCardHover}
                                carts={carts}
                            />
                        }
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {products.data[0] ? (
                        <div className="grid grid-cols-3 gap-8">
                            {products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    discount={product.discount}
                                    stock={product.quantity}
                                    rating={product.rating}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotFound title="Products" href="/dashboard" />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
