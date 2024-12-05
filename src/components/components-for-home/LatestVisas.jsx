import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const navigate = useNavigate();

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch visas from the backend using fetch API
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch("http://localhost:9000/latest-visas");

        if (!response.ok) {
          throw new Error("Failed to fetch visas");
        }
        const data = await response.json(); // Parse JSON response
        setVisas(data); // Store fetched visas in state
      } catch (error) {
        console.error("Failed to fetch visas", error);
      }
    };

    fetchVisas();
  }, []); // Empty dependency array ensures this runs once when component mounts
  //--------------------------------------------------------------


  // useEffect(() => {
  //   const fetchLatestVisas = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/latest-visas");
  
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch latest visas");
  //       }
  
  //       const data = await response.json(); // Parse JSON response
  //       setVisas(data); // Store fetched visas in state
  //     } catch (error) {
  //       console.error("Failed to fetch latest visas:", error);
  //     }
  //   };
  
  //   fetchLatestVisas();
  // }, []); // Empty dependency array ensures this runs once when component mounts
  




  //---------------------------------------------------------------

  const handleSeeDetails = (id) => {
    navigate(`/visa-details/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Visas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {visas.map((visa) => (
          <div
            key={visa._id} // Assuming visas have a unique _id field
            data-aos="fade-up"
            className="bg-white p-4 shadow rounded-lg hover:shadow-lg text-purple-500 "
          >

         
            <h2 className="text-xl font-semibold mb-2"> Country: {visa.countryName}</h2>
            <img src={visa.countryImage} alt={`Flag of ${visa.country}`} className="w-16 h-10 mt-2" />
           <p className="text-gray-700">visaType: {visa.visaType}</p>
           <p className="text-gray-700">processingTime: {visa.processingTime}</p>
       
           <p className="text-gray-700">requiredDocuments: {visa.requiredDocuments}</p>
           <p className="text-gray-700">applicationMethod: {visa.applicationMethod}</p>
           <p className="text-gray-700">fee: {visa.fee}</p>
       
            <p className="text-gray-700">validity: {visa.validity}</p>
    
          
            <button
              onClick={() => handleSeeDetails(visa._id)} // Pass the unique ID of the visa
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestVisas;
// {"_id":{"$oid":"675060141cbdae0d8029ea93"},"countryImage":"new visa 6",
// "countryName":"kjh",
//"visaType":"Tourist visa",
//"processingTime":"kjh",
// "requiredDocuments":["Valid passport"],
//"description":"jkbn",
//"ageRestriction":"8","fee":"9","validity":"9",
// "applicationMethod":"0",
//"userEmail":"nehal.sunderland@gmail.com"}