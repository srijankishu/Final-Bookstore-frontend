import React from 'react';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import { Signup } from './Component/Signup';
import { Navigate, Route, Routes } from 'react-router-dom';
import Contacts from '../src/Component/Contacts/Contacts';
import Srijan from './Component/Srijan';
import toast, { Toaster } from 'react-hot-toast';
import {useAuth} from "../src/Context/Auth";

import Pdfcomp from './Component/Pdfcomp';
import Test from './Component/Test';
import ProtectedRoute from './Context/ProtectedRoute';
import About from './Component/About';
import Mybooks from './Component/Mybooks';


const App = () => {
  const [auth,setAuth] = useAuth();
  console.log(auth);
  
  return (
   
    <div className="dark:bg-slate-800 dark:text-white bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
  
        <Route path="/course" element={auth ? <Courses /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contacts/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/my-books" element={<Mybooks/>} />

        
        <Route
          path="/srijan"
          element={
            <ProtectedRoute>
              <Srijan />
            </ProtectedRoute>
          }
        />
        <Route path="/pdfcomp" element={<Pdfcomp/>} />
   
        <Route path="/pdf/:pdfPath" element={<Test/>} />

       

      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
