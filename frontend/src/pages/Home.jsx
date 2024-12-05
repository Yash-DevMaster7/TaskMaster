import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">
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
        </div>
      </main>
    </div>
  );
};

export default Home;
