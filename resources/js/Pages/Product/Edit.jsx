import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import SuccessMessage from "@/Components/SuccessMessage";
import TextInput from "@/Components/TextInput";

export default function Create({ product }) {
    const { data, setData, processing, errors, reset, wasSuccessful, patch } =
        useForm({
            name: product.name || "",
            company: product.company || "",
            quantity: product.quantity || "",
            price: product.price || "",
            description: product.description || "",
            image: product.image || "",
        });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccessMessage(true);

            // Hide success message after 5 seconds
            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            // Cleanup the timeout
            return () => clearTimeout(timeout);
        }
    }, [wasSuccessful]);

    // Submit the form
    const submit = (e) => {
        e.preventDefault();

        patch(route("products.update", product.id), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-gray-600 min-h-screen pt-40">
            <Head title="Create" />

            {showSuccessMessage && (
                <SuccessMessage message="Product updated successfully" />
            )}

            <div className="max-w-3xl mx-auto p-10 shadow-xl shadow-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                    Create product
                </h1>

                <form onSubmit={submit}>
                    {/* Name Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />
                        {errors.name && (
                            <div className="text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Company Name Field */}
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="companyName"
                            value="Company Name"
                        />
                        <TextInput
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={data.company}
                            onChange={(e) => setData("company", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="companyName"
                        />
                        {errors.company && (
                            <div className="text-sm text-red-600">
                                {errors.company}
                            </div>
                        )}
                    </div>

                    {/* quantity Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="quantity" />
                        <TextInput
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            className="mt-1 block w-full"
                            autoComplete="quantity"
                        />
                        {errors.quantity && (
                            <div className="text-sm text-red-600">
                                {errors.quantity}
                            </div>
                        )}
                    </div>

                    {/* Price Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="price" value="Price" />
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="price"
                        />
                        {errors.price && (
                            <div className="text-sm text-red-600">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                            autoComplete="description"
                        />
                        {errors.description && (
                            <div className="text-sm text-red-600">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route("products.index")}
                            className="text-sm text-gray-100 hover:text-gray-900 mr-2"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
