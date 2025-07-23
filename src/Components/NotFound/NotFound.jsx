import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-teal-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2 text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
