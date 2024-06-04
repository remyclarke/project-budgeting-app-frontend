import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Show = ({ backendUrl }) => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/transactions/${id}`)
      .then((response) => setTransaction(response.data))
      .catch((error) => console.error(error));
  }, [backendUrl, id]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Transaction Details</h2>
      <ul className="list-group">
        <li className="list-group-item">Item Name: {transaction.item_name}</li>
        <li className="list-group-item">Amount: {transaction.amount}</li>
        {/* Add more transaction details as needed */}
      </ul>
    </div>
  );
};

export default Show;
