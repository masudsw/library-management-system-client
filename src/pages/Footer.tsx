import { Facebook, Linkedin, Twitter } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 px-4 mt-12 border-t">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Our Address</h3>
                    <p>444, Dhanmondi Dhaka</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Stay Connected</h3>
                    <p>Email: info@phlibrary.org</p>
                    <p>phone: 666666666</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Connect with sociel media</h3>
                    <div className="flex gap-8">
                        <p><Facebook /></p>
                        <p><Linkedin /></p>
                        <p><Twitter /></p>
                    </div>

                </div>
            </div>
            <div className="text-center mt-6 text-xs text-gray-500">
                © {new Date().getFullYear()} Library Management System. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer