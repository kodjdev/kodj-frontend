import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode; // we add an icon
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { t } = useTranslation();

  return (
    <div
      className="max-w-7xl mx-auto sm:max-w-[1440px] sm:mt-[30px] mb-4 sm:mb-[30px]"
      // className="flex flex-col w-full max-w-full sm:max-w-[1440px] pt-4 sm:pt-8 pb-4 sm:pb-8 px-4 sm:px-8 mt-4 sm:mt-[30px] mb-4 sm:mb-[30px] rounded-[8px] border border-[#505050] bg-[#141414]"
    >
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          className
        )}
      >
        {items.map((item, idx) => (
          <Link
            to={item.link}
            key={item.link}
            className="block group relative"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-25 group-hover:opacity-100 blur transition duration-500"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <Card className="border border-[#505050]">
              <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-4 ml-[-10px]">
                {item.icon}
              </div>
              <CardTitle>{t(item.title)}</CardTitle>
              <CardDescription>{t(item.description)}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-full p-6 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-semibold text-white mb-2", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn("text-neutral-400 text-md leading-relaxed", className)}>
      {children}
    </p>
  );
};
