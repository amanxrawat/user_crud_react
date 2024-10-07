import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API when the component mounts
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    // The addUser function that adds the new user to the users list
    const addUser = (newUser) => {
        setUsers([...users, newUser]); // Adds the new user to the state
    };

    return (
        <>
            <div className="flex gap-8">

                <CreateUser addUser={addUser} />
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-md font-bold">
                        <thead className="bg-yellow-800 text-white uppercase font-semibold">
                            <tr>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Phone</th>
                                {/* <th className="py-3 px-6">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-lime-200" : "bg-yellow-200"
                                        } hover:bg-gray-200`}
                                >
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">{user.phone}</td>
                                    {/* <td className="py-3 px-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition">
                Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={""}>
                Delete
                </button>
                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default UserManagement;
