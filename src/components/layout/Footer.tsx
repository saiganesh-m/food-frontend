import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">About FeastBox</h3>
            <p className="text-gray-300">
              FeastBox delivers authentic Indian cuisine and groceries to your doorstep. 
              From daily meals to party catering and specialty Indian groceries, we've got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Lunch Box</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Cloud Kitchen</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Party Orders</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Groceries</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Spice Street, Flavor City</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: hello@feastbox.com</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FeastBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;