import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoImg from "../../src/assets/avatars/kodj_new.jpg";

export default function FlipLogo() {
  return (
    <div className="relative w-28 h-28 overflow-hidden flex-shrink-0">
      <motion.div
        className="w-full h-full"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
       {/* oldi tomoni */}
        <motion.div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Link to="/">
            <img src={logoImg} alt="Logo Front" className="w-full h-full object-contain" />
          </Link>
        </motion.div>
        {/* // orqa tomoni */}
        <motion.div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Link to="/">
            <img src={logoImg} alt="Logo Back" className="w-full h-full object-contain" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}