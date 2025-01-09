import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade"; // For animations
import FaceDetection from "../component/FaceDetection/FaceDetection";
import { suggestions as suggestionsmain } from "../component/FaceDetection/suggestions";



export default function FaceDetectionPage() {

  // i want suggestions to load after 10 seconds 
  const [suggestions, setSuggestions] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setTimeout(() => {
        setSuggestions(suggestionsmain);
        const categories = Object.keys(suggestions);
        setCategories(categories);
      }, 1000);

    }, []);


  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-6">
        <FaceDetection/>
        <h1 className="text-4xl font-bold">Personalized Suggestions</h1>
        <p className="mt-2 text-lg">Discover movies, music, and activities tailored for you!</p>
      </header>

      <main className="container mx-auto px-6 py-12">
        {categories.map((category, index) => (
          <CategorySection key={index} title={category} items={suggestions[category]} />
        ))}
      </main>

      <footer className="text-center bg-gray-800 text-white py-4">
        <p>&copy; {new Date().getFullYear()} Personalized Suggestions. All rights reserved.</p>
      </footer>
    </div>
  );
}

function CategorySection({ title, items }) {
  return (
    <div className="mb-12">
      <Fade bottom>
        <h2 className="text-3xl font-semibold text-indigo-600 capitalize">{formatTitle(title)}</h2>
      </Fade>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {items.map((item, index) => (
          <SuggestionCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function SuggestionCard({ item }) {
  const title = item.title || item.activity || item.artist;
  const description = item.description;

  return (
    <Fade bottom>
      <div className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300 ease-in-out">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </Fade>
  );
}

function formatTitle(title) {
  return title.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

