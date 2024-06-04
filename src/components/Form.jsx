import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    item_name: "",
    from: "",
    category: "", // Added category to the form state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/transactions",
        formData
      );
      console.log("Transaction submitted with ID:", response.data.id);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
      />
      <input
        type="text"
        name="item_name"
        value={formData.item_name}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <input
        type="text"
        name="from"
        value={formData.from}
        onChange={handleChange}
        placeholder="From"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
