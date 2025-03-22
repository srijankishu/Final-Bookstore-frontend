import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import {Toaster,toast} from "react-hot-toast";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Cards = ({ item }) => {

  const [pdfName, setPdfName] = useState(null); // Store the PDF for this card
  const [allImage, setAllImage] = useState([]); // Store all PDFs from backend
  const navigate = useNavigate();

  useEffect(() => {
    const getPdf = async () => {
      try {
        const result = await axios.get("https://final-bookstore-backend.vercel.app/get-files");
        setAllImage(result.data.data); // Assuming the response contains an array of PDFs
      } catch (error) {
        console.error("Error fetching PDFs:", error.response ? error.response.data : error.message);
      }
    };

    getPdf();
  }, []);

  useEffect(() => {
    // Find the assigned PDF for the current card (item)
    const associatedPdf = allImage.find((pdf) => pdf.id === item.id); // Assuming both item and PDF have an `id` field
    if (associatedPdf) {
      setPdfName(associatedPdf.pdf); // Set the PDF name for the card
    }
  }, [allImage, item.id]); // Re-run this whenever the list of PDFs or the item ID changes

  const showPdf = () => {
    if (pdfName) {
      navigate(`/pdf/${encodeURIComponent(pdfName)}`); // Navigate to the PDF view page
    } else {
      console.error("No PDF available for this item.");
    }
  };


  const addBookOnDb = async () => {
    <div><Toaster/></div>
    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      const response = await axios.post(
        "https://final-bookstore-backend.vercel.app/purchase/buy",
        { bookId: item._id }, // Send book ID
        {
          headers: { Authorization: `Bearer ${token}` }, // Include auth token
          //withCredentials: true, // If using cookies for authentication
        }
      );
      
      console.log(response.data);
      
      if(response.data){
        toast.success("Book is Purchased!");
        return;
      }

     
      
    } catch (error) {
      console.error("Purchase failed:", error.response ? error.response.data : error.message);
      alert("Purchase failed! Check console for details.");
    }
  };

  


  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  
  


  const createOrder = async () => {
    try {
 
      
      const decodedToken = jwtDecode(localStorage.getItem('token'));     
      const response = await axios.post("https://final-bookstore-backend.vercel.app/create-order", {
        amount: item.price, // Amount in paise (e.g., 500 INR = 50000 paise)
        currency: 'INR',
        receipt: 'receipt_123',
        bookId: item._id,
        userId: decodedToken.id
      });

      const { data } = response;      
      
      if (!data.success) {
        return alert(data.message)
      }

      if (data.success) {
        return data.order; // Return the created order
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create an order. Please try again.');
    }
  };


  
  const handlePayment = async () => {
    const order = await createOrder(); // Fetch the order details from the backend

    if (!order) return; // Exit if the order creation fails

    const options = {
      key: 'rzp_test_dTDDElTlJsbQLC', // Replace with your Razorpay Key ID
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: 'Acme Corp', // Your business name
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order.id, // Use the `order_id` from backend
      handler:async  (response) => {
       
        await addBookOnDb() ;
        // alert(`Payment ID: ${response.razorpay_payment_id}`);
        // alert(`Order ID: ${response.razorpay_order_id}`);
        // alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: 'Gaurav Kumar', // Customer's name
        email: 'gaurav.kumar@example.com',
        contact: '9000090000', // Customer's phone number
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', (response) => {
        alert(`Error Code: ${response.error.code}`);
        alert(`Description: ${response.error.description}`);
        alert(`Source: ${response.error.source}`);
        alert(`Step: ${response.error.step}`);
        alert(`Reason: ${response.error.reason}`);
        alert(`Order ID: ${response.error.metadata.order_id}`);
        alert(`Payment ID: ${response.error.metadata.payment_id}`);
    });

    rzp1.open();
  };








  return (
   <div className='mt-4'>
    <div className="card bg-base-100 w-90 m-2 shadow-xl hover:scale-105 duration-200 bg-white text-black dark:bg-slate-900 dark:text-white dark:border">
      <figure>
        <img src={item.image} alt="Book Cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary">{item.category}</div>
         
        </h2>
        <p>Genre: {item.title}</p>
        <p> Author: <span className="italic">{item.author}</span> </p>
        <div className="card-actions justify-between">
         
          <div>
{pdfName ? (
  item.price === 0 ? (
    <div className="flex justify-center w-full">
      <button className="cursor-pointer px-4 py-1 rounded-full border-[2px] hover:bg-pink-500 
      hover:text-white duration-300 badge-outline" onClick={showPdf}>Read</button>
    </div>
  ) : (
    <div
      className="cursor-pointer px-4 py-1 rounded-full border-[2px] hover:bg-pink-500 
      hover:text-white duration-300 badge-outline"
      onClick={handlePayment}
    >
      ${item.price}
    </div>
  )
) : (
  <p>No PDF available</p>
)}
</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Cards;
