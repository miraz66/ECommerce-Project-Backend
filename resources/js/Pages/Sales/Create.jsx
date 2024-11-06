import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SuccessMessage from "@/Components/SuccessMessage";
import { usePage } from "@inertiajs/react";
import GeneratePDF from "@/Components/GeneratePDF";

export default function Create({ products }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            saleItems: [],
        });

    const { props } = usePage();
    const successMessage = props.flash?.success;

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [saleItems, setSaleItems] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleMedicineChange = (e) => {
        const selectedId = e.target.value;
        const medicine = products.find((med) => med.id == selectedId);
        setSelectedMedicine(medicine);
    };

    const addMedicineToList = () => {
        if (!selectedMedicine || !quantity) return;
        if (selectedMedicine?.stock < quantity) return;

        const totalPrice = selectedMedicine.price * quantity;

        const newItem = {
            product_id: selectedMedicine.id,
            quantity,
            total_price: totalPrice,
        };

        setSaleItems((prevItems) => [...prevItems, newItem]);
        setQuantity("");
        setSelectedMedicine(null);
    };

    const removeItem = (index) => {
        setSaleItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setData("saleItems", saleItems);
    }, [saleItems]);

    const submit = (e) => {
        e.preventDefault();
        post(route("sales.store"), { onSuccess: () => reset() });
        setSaleItems([]);
    };

    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccessMessage(true);
            const timeout = setTimeout(
                () => setShowSuccessMessage(false),
                3000
            );
            return () => clearTimeout(timeout);
        }
    }, [wasSuccessful]);

    return (
        <div className="bg-gray-600 min-h-screen pt-40">
            <Head title="Create Sale" />

            {showSuccessMessage && <SuccessMessage message={successMessage} />}

            <div className="max-w-3xl mx-auto p-10 shadow-xl shadow-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-100">
                    Create Sale
                </h1>

                <form onSubmit={submit}>
                    {/* Medicine Select */}
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="medicine"
                            value="Select Medicine"
                        />
                        <select
                            id="medicine"
                            value={selectedMedicine?.id || ""}
                            onChange={handleMedicineChange}
                            className="mt-1 block w-full text-gray-300 bg-gray-100 dark:bg-gray-600 p-2"
                        >
                            <option value="">-- Select Medicine --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} (Stock: {product.quantity})
                                    (Price: {product.price})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity Input */}
                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="Quantity" />
                        <TextInput
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 p-2"
                        />
                    </div>
                    {/* Quantity price: */}
                    {errors.saleItems && data.saleItems.length === 0 && (
                        <div className="text-red-500 text-sm">
                            {errors.saleItems}
                        </div>
                    )}
                    {selectedMedicine?.quantity < quantity && (
                        <div className="text-red-500 text-sm">
                            Selected medicine is out of stock
                        </div>
                    )}
                    {selectedMedicine && (
                        <div className="mt-4">
                            <span className="text-gray-300">
                                Price: ${selectedMedicine?.price * quantity}
                            </span>
                        </div>
                    )}
                    {/* Add to Sale List Button */}
                    <div className="mt-4">
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addMedicineToList}
                        >
                            Add to Sale List
                        </button>
                    </div>

                    {/* Sale Items */}
                    {saleItems.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-lg text-gray-100">
                                Sale Items:
                            </h2>
                            <ul>
                                {saleItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center mt-2"
                                    >
                                        <span className="text-gray-300">
                                            {item.name} - {item.quantity} units
                                            - ${item.total_price}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Total and Download PDF */}
                    <div className="mt-4">
                        <span className="text-gray-300">
                            Total: $
                            {saleItems.reduce(
                                (total, item) => total + item.total_price,
                                0
                            )}
                        </span>
                        <GeneratePDF saleItems={saleItems} />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/sales"
                            className="text-sm text-gray-200 hover:text-gray-300"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Record Sale"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
