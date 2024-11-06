export default function SuccessMessage({ message }) {
    return (
        <>
            <h1 className="mb-4 text-green-500 dark:text-green-400 text-center">
                {message}
            </h1>
        </>
    );
}
