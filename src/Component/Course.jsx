import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [book, setBook] = useState([]);
  const [bookCart, setBookCart] = useState(() => {
    return JSON.parse(localStorage.getItem("bookCart")) || []; // Load purchased books
  });

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://final-bookstore-backend.vercel.app/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-14 text-center pt-8 dark:bg-slate-800 dark:text-white">
        <h1 className="text-2xl md:text-4xl text-black dark:text-white">
          We are delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-10 text-black dark:text-white">
          Unlock knowledge, gain new skills, and explore courses crafted just
          for you. Dive in and discover something amazing today!
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link to="/">
            <button className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>

          {/* My Book Cart Button */}
          <Link to="/my-books">
            <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700 duration-300">
              My Book Cart 
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {book.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Course;
