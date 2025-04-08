import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import telegram from "../../../assets/avatars/kodj_telegram.jpg";

export const QrcodeCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Toggle expanded view
    const toggleExpandedView = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="flex items-center justify-center pt-5 w-full">
        <motion.div
          onClick={toggleExpandedView}
          className="relative cursor-pointer"
          initial={{ filter: "blur(8px)" }}
          whileHover={{ filter: "blur(0px)" }}
        >
          <img
            src={telegram}
            alt="telegram"
            width={280}
            height={300}
            className="aspect-square object-cover object-center rounded-sm transition-all duration-200"
          />
        </motion.div>
  
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
              onClick={toggleExpandedView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-[90%] h-[90%] sm:w-[60%] sm:h-[60%] md:w-[50%] md:h-[50%] lg:w-[40%] lg:h-[40%] flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <img
                  src={telegram}
                  alt="telegram"
                  // objectFit="contain"
                  className="rounded-md"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };