import React from "react";
import { motion } from "framer-motion";

interface NewsItem {
  id: string;
  uniqueId: string;
  title: string;
  author: string;
  images: string[];
  lastEdited: FirebaseFirestore.Timestamp; 
}

interface NewsCardProps {
  newsItem: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
  const { title, author, images, lastEdited } = newsItem;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {images && images.length > 0 && (
        <img
          src={images[0]}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
       <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h2>
       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">By {author}</p>
       <p className="text-xs text-gray-500 dark:text-gray-400">
         Last Edited: {new Date(lastEdited.seconds * 1000).toLocaleDateString()}
       </p>
      </div>
    </motion.div>
  );
};

export default NewsCard;
