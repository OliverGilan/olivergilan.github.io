export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Oliver Gilan
          </p>
        </div>
      </div>
    </footer>
  );
};
