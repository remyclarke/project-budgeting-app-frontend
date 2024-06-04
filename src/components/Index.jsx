import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = ({ backendUrl }) => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get(`${backendUrl}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error(error));
  }, [backendUrl]);

  const handleDelete = (id) => {
    axios
      .delete(`${backendUrl}/transactions/${id}`)
      .then(() => setTransactions(transactions.filter((t) => t.id !== id)))
      .catch((error) => console.error(error));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      item_name: transaction.item_name,
      amount: transaction.amount,
      date: transaction.date,
      from: transaction.from,
      category: transaction.category,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      axios
        .put(`${backendUrl}/transactions/${editingTransaction.id}`, formData)
        .then((response) => {
          setTransactions(
            transactions.map((t) =>
              t.id === editingTransaction.id ? response.data : t
            )
          );
          setEditingTransaction(null);
          setFormData({
            item_name: "",
            amount: 0,
            date: "",
            from: "",
            category: "",
          });
        })
        .catch((error) => console.error("Error updating transaction:", error));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <h2>All Transactions</h2>
      <ul className="list-group">
        {Array.isArray(transactions) &&
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{transaction.item_name}</strong> - ${transaction.amount}{" "}
                - {transaction.date} - {transaction.from} -{" "}
                {transaction.category}
              </span>
              <div>
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>

      {editingTransaction && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Edit Transaction</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="item_name">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_name"
                  name="item_name"
                  placeholder="Item Name"
                  value={formData.item_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="from">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="from"
                  name="from"
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
