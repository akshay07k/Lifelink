import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import {blood} from "../../assets/index"

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
    <div className="bg-gray-100 min-h-screen grid">
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
            If you or someone you know requires blood,<br /> don't hesitate to request it.
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
            src={blood}
            alt="Blood Donation"
            className="w-4/5 rounded-3xl object-contain"
          />
        </div>
      </section>

      <section id="process" className="bg-white p-8">
        <h2 className="text-2xl font-semibold mb-4">Donation Process</h2>
        <ol className="list-decimal pl-6">
          <li className="mb-2">
            <strong>Register:</strong> Register on lifelink for blood services.
          </li>
          <li className="mb-2">
          <strong>Donate:</strong> Click on Donate now and select the user which you want to donate .
          </li>
          <li className="mb-2">
          <strong>Contact:</strong> Contact with the user for any query.
          </li>
          <li className="mb-2">
          <strong>Donate Blood:</strong> Donate the blood to the user.
          </li>
          <li>
          <strong>Request:</strong> You can also request blood and your your request will send to all lifelink users.
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
