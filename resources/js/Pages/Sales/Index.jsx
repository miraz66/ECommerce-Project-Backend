import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

export default function Index() {
    return (
        <>
            {" "}
            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Products
                        </h2>

                        <Link
                            href="/sales/create"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Sales Product
                        </Link>
                    </div>
                }
            >
                <Head title="Products" />

                <div className="container mx-auto pt-10 max-w-7xl">
                    <table className="min-w-full text-gray-300">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="py-2 px-4 text-start">Id</th>
                                <th className="py-2 px-4 text-start">Name</th>
                                <th className="py-2 px-4 text-start">
                                    Company
                                </th>
                                <th className="py-2 px-4 text-start">
                                    Quantity
                                </th>
                                <th className="py-2 px-4 text-start">Price</th>
                                <th className="py-2 px-4 text-start">Profit</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {/* {products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4">
                                        {product.name}
                                    </td>
                                    <td className="py-2 px-4">
                                        {product.company}
                                    </td>
                                    <td className="py-2 px-4">
                                        {product.quantity}
                                    </td>
                                    <td className="py-2 px-4">
                                        ${product.price}
                                    </td>
                                    <td className="py-2 px-4 space-x-6 float-end">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                destroyProduct(product.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {/* <Pagination data={products} /> */}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
