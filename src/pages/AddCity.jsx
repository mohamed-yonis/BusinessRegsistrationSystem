
import React, { useState } from "react";
import axios from "axios";


const AddCity = () => {
  const [cityName, setCityName] = useState(""); 
  const [message, setMessage] = useState("");   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/cities", {
        name: cityName,
      });
      setMessage(response.data.message || "City added successfully");
      setCityName(""); 
    } catch (error) {
      setMessage("Error adding city");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add a New City</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">City Name:</label>
        <input
          type="text"
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />
        <button type="submit">Add City</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCity;
