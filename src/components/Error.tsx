import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Error() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center -mt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-700 transition-colors duration-200"
            >
              <FiArrowLeft className="text-xl" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}