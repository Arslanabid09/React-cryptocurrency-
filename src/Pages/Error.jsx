import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-5">
      <div className="text-9xl mb-8 animate-bounce">🚀</div> {/* Fun Rocket Emoji */}
      <h1 className="text-4xl font-bold mb-2">Uh oh! You seem lost in space!</h1>
      <p className="text-lg mb-6">
        The page you're looking for doesn't exist. Maybe it got sucked into a
        black hole... 🌀
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-400 transition duration-300"
      >
        Go Back Home
      </Link>
      <p className="text-sm text-gray-400 mt-4">
        (You might also want to call NASA 🛰️)
      </p>
    </div>
  );
};

export default NotFoundPage;
