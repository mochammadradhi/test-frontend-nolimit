interface errorProps {
  errorMsg: "string";
}
const ErrorComponent = ({ errorMsg }: errorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500 text-lg font-semibold">
        {errorMsg || "An error occurred. Please try again."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorComponent;
