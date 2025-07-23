import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"

export default function Register() {

  const [isCallingAPI , setIsCallingAPI] = useState(false);
  const [apiError , setApiError] = useState(false);
  let navigate = useNavigate()

  const initialValues = {
    username:"",
    email:"",
    password:"",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3,"Minimum lenght is 3 letters").max(15,"Maximum lenght is 15 letters").required("Required"),
    email: Yup.string().email("Invaild email").required("Required"),
    password: Yup.string().matches(new RegExp ('^[A-Z][a-z0-9]{3,8}$'),'Invaild Password').required("Required")
  })

  const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit : callRegister
  })

  async function callRegister(values) {
    setIsCallingAPI(true);
    setApiError(null);

    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = registeredUsers.some(
      (user) => user.email === values.email
    );

    if (userExists) {
      setApiError("Account already exists.");
      setIsCallingAPI(false);
      return;
    }

    // Save the new user to localStorage
    registeredUsers.push(values);
    localStorage.setItem("users", JSON.stringify(registeredUsers));

    setIsCallingAPI(false);
    navigate("/login");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-green-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg ">
        

        <form onSubmit={registerForm.handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-lora font-semibold text-center text-teal-900 dark:text-white mb-6">
          Create an Account
        </h2>
          {apiError ? <div className="text-red-600">{apiError}</div> : ""}
           
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onBlur={registerForm.handleBlur} value={registerForm.values.username} onChange={registerForm.handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {registerForm.errors.username && registerForm.touched.username ? <div className="text-red-600">{registerForm.errors.username}</div> : ""}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
             {registerForm.errors.email && registerForm.touched.email ? <div className="text-red-600">{registerForm.errors.email}</div> : ""}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {registerForm.errors.password && registerForm.touched.password ? <div className="text-red-600">{registerForm.errors.password}</div> : ""}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-white text-black dark:bg-teal-600 dark:text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-teal-700"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
