// src/components/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const EditUser = () => {
  const { value } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch user data when the component mounts
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${value}`)
      .then((response) => {
        setUserData(response.data); // Store user data in state
        reset(response.data); // Pre-fill form with user data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [value, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${value}`, data)
      .then(() => {
        alert('User updated successfully!');
        // navigate('/user-management'); // Redirect after update
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert('Failed to update user. Please try again.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-[25rem] mx-auto p-6 bg-yellow-800 rounded-md shadow-md space-y-6"
    >
      <div className="flex justify-center">
        <h1 className="text-lg font-bold">Edit User</h1>
      </div>

      <div>
        <label className="block text-orange-300 font-bold">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
          className="w-full mt-1 p-2 bg-yellow-950 text-white rounded-md border-[2px] border-yellow-600"
          placeholder="Enter your name"
          defaultValue={userData?.name} // Pre-fill with user name
        />
        {errors.name && <p className="text-red-500 text-md">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-orange-300 font-bold">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className="w-full mt-1 p-2 bg-yellow-950 text-white rounded-md border-[2px] border-yellow-600"
          placeholder="Enter your email"
          defaultValue={userData?.email} // Pre-fill with user email
        />
        {errors.email && <p className="text-red-500 text-md font-semibold">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-orange-300 font-bold">Phone</label>
        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            minLength: { value: 10, message: "Phone number must be at least 10 digits" },
          })}
          className="w-full mt-1 p-2 bg-yellow-950 text-white rounded-md border-[2px] border-yellow-600"
          placeholder="Enter your phone number"
          defaultValue={userData?.phone} // Pre-fill with user phone
        />
        {errors.phone && <p className="text-red-500 text-md font-semibold">{errors.phone.message}</p>}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-orange-500 font-bold text-orange-950 px-4 py-2 rounded-md hover:bg-orange-700 hover:font-bold hover:text-orange-300 transition w-full"
        >
          Update User
        </button>
      </div>
    </form>
  );
};

export default EditUser;
