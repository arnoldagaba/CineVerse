interface LoaderProps {
    size?: "sm" | "md" | "lg";
}

const Loader = ({ size = "md" }: LoaderProps) => {
    const sizes = {
        sm: "h-6 w-6 border-2",
        md: "h-10 w-10 border-4",
        lg: "h-16 w-16 border-4",
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className={`rounded-full border-t-blue-500 border-r-transparent animate-spin ${sizes[size]}`}
                style={{ borderStyle: "solid" }}
            ></div>
        </div>
    );
};

export default Loader;
