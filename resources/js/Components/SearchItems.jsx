import React from "react";
import { useForm } from "@inertiajs/react";

export default function SearchItems({ route, searchTerm }) {
    const { get, data, setData } = useForm({
        search: "",
        category: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route, { search: data.search });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(e);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center w-3/4 sm:w-1/3"
        >
            {searchTerm === "search" && (
                <input
                    className="px-4 py-2 w-full bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    type="text"
                    placeholder="Search..."
                    value={data.search}
                    onChange={(e) => setData("search", e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            )}

            {searchTerm === "category" && (
                <input
                    className="px-4 py-2 w-full bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    type="text"
                    placeholder="Search..."
                    value={data.category}
                    onChange={(e) => setData("category", e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            )}
        </form>
    );
}
