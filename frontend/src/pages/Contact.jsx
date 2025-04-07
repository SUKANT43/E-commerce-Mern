import React from "react";
import { FaEnvelope, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center mb-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h1>
        <p className="text-gray-600 mb-6">Feel free to reach out through any of the platforms below:</p>

        <div className="flex flex-col space-y-4 text-lg">
          <a
            href="sukant98657@gmail.com"
            className="flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            <FaEnvelope className="text-xl" /> sukant98657@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/sukant-c-b6bba4317/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaLinkedin className="text-xl" /> LinkedIn
          </a>

          <a
            href="https://www.instagram.com/sukant._5?igsh=NDFucWt4cHR1OWhx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaInstagram className="text-xl" /> Instagram
          </a>

          <a
            href="https://github.com/SUKANT43"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg transition"
          >
            <FaGithub className="text-xl" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
