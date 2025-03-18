import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";

export default function Pagination({ data }) {
    return (
        <div className="flex items-center justify-between bg-white/5 px-4 py-2 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-200">
                        Showing{" "}
                        <span className="font-medium">{data.meta.from}</span> to{" "}
                        <span className="font-medium">{data.meta.to}</span> of{" "}
                        <span className="font-medium">{data.meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    >
                        <Link
                            href={data.meta.links[0].url}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                            />
                        </Link>
                        {data.meta.links
                            .slice(length, data.meta.links.length - 1)
                            .map((link) => (
                                <Link
                                    href={link.url}
                                    key={link.label}
                                    className={
                                        link.active
                                            ? "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-100 ring-1 ring-inset ring-gray-300 bg-indigo-600 focus:outline-offset-0"
                                            : "relative hidden items-center hover:bg-indigo-600 px-4 py-2 text-sm font-semibold text-gray-100 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 md:inline-flex"
                                    }
                                >
                                    {link.label}
                                </Link>
                            ))}

                        <Link
                            href={
                                data.meta.links[data.meta.links.length - 1].url
                            }
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                            />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
