import React from 'react';
import { motion } from 'framer-motion';

const ComponentLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ComponentLoading;