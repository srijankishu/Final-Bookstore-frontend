import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Link } from 'react-router-dom';

function Pdfcomp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.9); // 90% of screen width
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='flex flex-col justify-center items-center dark:bg-gray-900 min-h-screen overflow-auto'>
      <Link to="/">
        <button className='bg-pink-500 mt-4 px-4 py-2 rounded-md text-white hover:bg-pink-700 duration-300 focus:outline-none focus:ring-0 active:ring-0'>
          Back
        </button>
      </Link>

      <p className='text-xl p-4 font-bold text-center dark:text-white'>
        {numPages ? `Page 1 of ${numPages}` : 'Loading...'}
      </p>

      {/* PDF Wrapper */}
      <div className='w-full px-2 sm:px-4 flex justify-center'>
        {pdfFile ? (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <div
                  key={i}
                  className='mb-5 border-2 border-pink-500 bg-pink w-full sm:w-auto overflow-hidden dark:text-white flex justify-center'
                >
                  <Page
                    pageNumber={i + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    width={Math.min(pageWidth, 600)} // Dynamic width, max 600px
                  />
                </div>
              ))}
          </Document>
        ) : (
          <p className='dark:text-white text-black'>No PDF file selected</p>
        )}
      </div>
    </div>
  );
}

export default Pdfcomp;
