import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 mt-20">
      <div className="max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About This Project</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our e-commerce platform, a dynamic application built using the MERN stack 
          (MongoDB, Express, React, Node.js) and Cloudinary used as cloud storage. Our project caters to both buyers and sellers by offering 
          specialized pages and functionalities tailored for each user type.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-blue-700">
            <li>Responsive and interactive user interface</li>
            <li>Secure authentication and user management</li>
            <li>Dedicated seller dashboard for product management</li>
            <li>Streamlined shopping cart and checkout process</li>
            <li>Efficient order tracking and customer support</li>
          </ul>
        </div>
        <p className="text-gray-600">
          Our goal is to deliver a seamless and engaging shopping experience while empowering sellers 
          with robust tools to manage their storefronts. Explore the site to experience the versatility 
          and power of our platform designed for both users and sellers.
        </p>
      </div>
      <footer className="mt-8">
        <p className="text-gray-500">Created with ❤️ using the MERN stack.</p>
      </footer>
    </div>
  );
}

export default About;
