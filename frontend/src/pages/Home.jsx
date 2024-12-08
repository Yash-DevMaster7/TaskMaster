import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-teal-800 mb-4">
            Welcome to TaskMaster
          </h1>
          <p className="text-xl text-teal-600 mb-8">
            Organize your life, one task at a time.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
            <blockquote className="text-2xl font-semibold italic text-center text-teal-700">
              "The secret of getting ahead is getting started. The secret of
              getting started is breaking your complex overwhelming tasks into
              small manageable tasks, and starting on the first one."
            </blockquote>
            <p className="mt-4 text-teal-500">- Mark Twain</p>
          </div>
          <div className="my-8 text-xl">
            <Link
              to={"/signup"}
              className="py-2 px-3 md:px-5 font-light md:font-medium text-teal-500 border-2 border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition duration-300"
            >
              Get started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
