import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function Blood() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-red-500 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Blood Donation</h1>
        <p>Save Lives, Donate Blood!</p>
        <Link to="/blood-req" className="mt-4 inline-block px-6 py-2 bg-white text-red-500 rounded-full font-semibold hover:bg-red-100 transition duration-300">
          Donate Now
        </Link>
      </header>

      <section id="process1" className="bg-white p-8 flex h-80">
        <div className="w-1/2 h-full pt-16 px-8">
          <h2 className="text-4xl font-semibold mb-4">Need a Blood</h2>
          <p className="mb-4 text-lg">
            If you or someone you know requires blood, don't hesitate to request it.
          </p>
          <button className="bg-red-500 text-white text-lg px-5 py-2.5 rounded-full hover:bg-red-600 transition duration-300" onClick={toggleForm}>
            Request Blood
          </button>

          
          {showForm && (
            <div ref={formRef}>
                <Form />
            </div>
          )}
        </div>

        <div className="w-1/2 pr-8">
          <img
            src=""
            alt="Blood Donation"
            className="w-1/2 h-96"
          />
        </div>
      </section>

      <section id="process" className="bg-white p-8">
        <h2 className="text-2xl font-semibold mb-4">Donation Process</h2>
        <ol className="list-decimal pl-6">
          <li className="mb-2">
            <strong>Register:</strong> Visit a blood donation center and register as a donor.
          </li>
          <li className="mb-2">
            <strong>Health Questionnaire:</strong> Complete a brief health questionnaire.
          </li>
          <li className="mb-2">
            <strong>Medical Examination:</strong> Undergo a quick medical examination.
          </li>
          <li className="mb-2">
            <strong>Donate Blood:</strong> The actual blood donation process (usually 10-15 minutes).
          </li>
          <li>
            <strong>Rest and Refreshments:</strong> Relax and enjoy some refreshments afterward.
          </li>
        </ol>
      </section>

      {/* Add more sections (Find a Center, Testimonials, FAQs, etc.) */}

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>Contact Us: lifelink@gmail.com</p>
        {/* Add social media icons and links here */}
      </footer>
    </div>
  );
}

export default Blood;
