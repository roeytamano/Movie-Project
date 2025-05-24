const Footer = () => {
    return (
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;