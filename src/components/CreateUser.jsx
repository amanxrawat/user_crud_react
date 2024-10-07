import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateUser = ({ addUser }) => {
  // Using react-hook-form for form management
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", data)
      .then((response) => {
        addUser(response.data);  
        reset(); 
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-[25rem] mx-auto p-6 bg-yellow-800 rounded-md shadow-md space-y-6"
      >
        <div className=" flex justify-center "><h1 className="text-lg font-bold">Create New User</h1></div>
      <div> 
        <label className="block text-orange-300 font-bold">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
          className="w-full mt-1 p-2 bg-yellow-950 text-white rounded-md border-[2px] border-yellow-600"
          placeholder="Enter your name"
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
          className="w-full mt-1 p-2 bg-yellow-950 text-white rounded-md border-[2px] border-yellow-600 "
          placeholder="Enter your phone number"
          />
        {errors.phone && <p className="text-red-500 text-md font-semibold">{errors.phone.message}</p>}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-orange-500 font-bold text-orange-950 px-4 py-2 rounded-md hover:bg-orange-700 hover:font-bold hover:text-orange-300 transition w-full"
          >
          Create User
        </button>
      </div>
    </form>
  </>
  );
};

export default CreateUser;
