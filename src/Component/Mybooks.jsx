import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PurchasedBooks from "./PurchasedBooks";
import { Link } from 'react-router-dom';

const Mybooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:4001/purchase/my-purchases', {
          headers: { Authorization: `Bearer ${token}` },

        });

        setPurchasedBooks(response.data.books);

      } catch (error) {
        console.error('Error fetching purchased books:', error.response ? error.response.data : error.message);
      }
    };

    fetchPurchasedBooks();
  }, []);

  return (

    <div className="min-h-screen dark:bg-slate-900 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    
    {/* Back Button at the Top */}
    <div className="md:col-span-3 flex justify-center">
      <Link to="/course">
      <button className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-700 duration-300">
      <span className="text-lg">←</span> Back
      </button>
      </Link>
    </div>

    {/* Purchased Books Section */}
    {purchasedBooks.length > 0 ? (
      purchasedBooks.map((book) => <PurchasedBooks item={book} />)
    ) : (
      <p className="text-center text-gray-500 md:col-span-3">
        No purchased books available.
      </p>
    )}
    
  </div>
  );
};

export default Mybooks;
