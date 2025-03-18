import React from "react";
import { Link } from "@inertiajs/react";

const Show = ({ product }) => {
    return (
        <div className="p-6 pt-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-center mb-4 rounded"
                />
                <p className="mb-2">
                    <strong>Price:</strong> ${product.price}
                </p>
                <p className="mb-2">
                    <strong>Quantity:</strong> {product.quantity}
                </p>
                <p className="mb-2">
                    <strong>Company:</strong> {product.company}
                </p>
                <p className="mb-4">
                    <strong>Description:</strong> {product.description}
                </p>

                <button
                    onClick={() => window.history.back()}
                    className="text-blue-500 hover:underline"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Show;
