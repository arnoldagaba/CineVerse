const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 mt-8 text-gray-600 dark:text-gray-300 text-sm w-full">
            <div className="container mx-auto">
                &copy; {new Date().getFullYear()} CineVerse. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
