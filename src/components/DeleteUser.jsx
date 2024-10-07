// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [userToDelete, setUserToDelete] = useState(null);

  // Function to fetch users
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Function to delete user (triggered by clicking Delete button)
  const handleDeleteUser = (userId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-md font-bold">
        <thead className="bg-yellow-800 text-white uppercase font-semibold">
          <tr>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Phone</th>
            <th className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-lime-200" : "bg-yellow-200"
              } hover:bg-gray-200`}
            >
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.phone}</td>
              <td className="py-3 px-6">
                
                {/* Delete Button */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteUser;
