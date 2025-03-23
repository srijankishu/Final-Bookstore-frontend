import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Footer from './Footer';


const About = () => {
  return (
    <>
   <Navbar/>
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">About Our Bookstore</h1>
      <p className="max-w-2xl text-center text-lg">
        Welcome to our bookstore! We offer a wide variety of books, including free and paid ones. Enjoy reading and exploring new stories with us.
      </p>
      <Link to="/">
        <button className="bg-pink-500 mt-6 px-6 py-3 rounded-md text-white hover:bg-pink-700 duration-300">
          Back to Home
        </button>
      </Link>
    </div>
    <Footer/>
    </>
  );
};

export default About;
