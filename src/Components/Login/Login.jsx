import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Login() {

  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const [apiError, setApiError] = useState(false);
  //let {setToken} = useContext(tokenContext)
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
      email: Yup.string().email("Invaild email").required("Required"),
      password: Yup.string().matches(new RegExp ('^[A-Z][a-z0-9]{3,8}$'),'Invaild Password').required("Required")
    })

    const loginForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit : callLogin
      })

      async function callLogin(values) {
        setIsCallingAPI(true);
        setApiError(null);

        const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
        const matchedUser = registeredUsers.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );

        if (matchedUser) {
          localStorage.setItem("userToken", "fake-token");
          navigate("/");
        } else {
          setApiError("Invalid email or password");
        }

        setIsCallingAPI(false);
      }
      
      

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="w-full max-w-md bg-green-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            <h2 className="text-4xl font-lora font-semibold text-center text-teal-900 dark:text-white mb-6">
              Login
            </h2>

            {apiError ? <div className="text-red-600">{apiError}</div> : ""}

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
              />
              {loginForm.errors.email && loginForm.touched.email ? (
                <div className="text-red-600">{loginForm.errors.email}</div>
              ) : (
                ""
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
              />
              {loginForm.errors.password && loginForm.touched.password ? (
                <div className="text-red-600">{loginForm.errors.password}</div>
              ) : (
                ""
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white text-black dark:bg-teal-600 dark:text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-teal-700"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
