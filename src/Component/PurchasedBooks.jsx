import axios from 'axios';
import React from 'react';
import { pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import {Toaster,toast} from "react-hot-toast";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const PurchasedBooks = ({ item }) => {

    const navigate = useNavigate();
    
    const showBook = (pdf) => {
        if (!pdf) {
            alert("No PDF file is available to Display")
            return
        }
        navigate(`/pdf/${encodeURIComponent(pdf)}`)
                
    }


    
    

    const book = item.bookId ;
    

    const deletePurchasedBook = async (bookid) => {

        if (!bookid) {
            console.error("Book ID is missing!");
            return;
        }

        const confirmation = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");
    
        if (!confirmation) {
            toast.error("Deletion cancelled");
         return; 
        }
        try {
            const response = await axios.post("https://final-bookstore-backend.vercel.app/purchase/delete-purchased-book", {
                bookId: bookid 
            });

            console.log(response.data); 
            window.location.reload();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };
    

    
    //console.log(book?._id);
    

    return (
        <div className='mt-4'>
            <div className="card bg-base-100 w-90 m-2 shadow-xl hover:scale-105 duration-200 bg-white text-black dark:bg-slate-900 dark:text-white dark:border">
                <figure>
                <img src={book?.image || "default-image.jpg"} alt="Book Cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                    {book?.name || "Unknown Book"}
                        <div className="badge badge-secondary">{book?.category || "Unknown"}</div>

                    </h2>
                    <p>Genre: {book?.title || "N/A"}</p>
                    <p> Author: <span className="italic">{book?.author || "Unknown"}</span> </p>
                    <div className="card-actions justify-between">
                        <button className='cursor-pointer px-4 py-1 rounded-full border-[2px] hover:bg-pink-500 
        hover:text-white duration-300 badge-outline' onClick={ () => showBook(book?.pdf) }>Read</button>
                        <div>                    
                        <button className='cursor-pointer px-4 py-1 rounded-full border-[2px] hover:bg-pink-500 
        hover:text-white duration-300 badge-outline' onClick={ () => deletePurchasedBook(book?._id) }>Remove</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PurchasedBooks;
