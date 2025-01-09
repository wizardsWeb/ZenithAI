import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FaceDetection from "../component/FaceDetection/FaceDetection";
import { suggestions as suggestionsmain } from "../component/FaceDetection/suggestions";
import { BentoCardImage, BentoTilt } from "../component/home/Features";
import Modal from "../component/FaceDetection/Modal";
import Loader from "../component/FaceDetection/Loader";

export default function FaceDetectionPage() {
  const [suggestions, setSuggestions] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Close modal after 10 seconds
    const modalTimer = setTimeout(() => {
      setIsModalOpen(false);
      setIsLoading(true);
    }, 10000);

    // Show loader for 3 seconds, then load suggestions
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
      setSuggestions(suggestionsmain);
      const categories = Object.keys(suggestionsmain);
      setCategories(categories);
    }, 13000);

    return () => {
      clearTimeout(modalTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen min-w-screen text-gray-800">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isModalOpen && <FaceDetection />}
      </Modal>

      <main className="mx-auto px-8 md:px-20 py-12">
      <header className=" py-6">
        <h1 className="text-4xl font-bold">Personalized Suggestions</h1>
        <p className="mt-2 text-lg">Discover movies, music, and activities tailored for you!</p>
      </header>
        <AnimatePresence>
          {isLoading ? (
            <Loader key="loader" />
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <CategorySection title={category} items={suggestions[category]} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function CategorySection({ title, items }) {
  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold capitalize"
      >
        {formatTitle(title)}
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
      >
        {items.map((item, index) => (
          <SuggestionCard1 key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function SuggestionCard1({ item }) {
  const title = item.title || item.activity || item.artist;
  const description = item.description;
  const image = item.image;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
        <BentoCardImage
          src={image}
          title={<>{title}</>}
          description={description}
        />
      </BentoTilt>
    </motion.div>
  );
}

function formatTitle(title) {
  return title.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

