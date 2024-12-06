import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { NewsItem } from "../../../types";

export default function TechNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const q = query(
        collection(db, "news"),
        where("category", "==", "tech"), // cetegoriya orqali fitler qilamiz datani
        orderBy("lastEdited", "desc")
      );
      const querySnapshot = await getDocs(q);
      const newsData: NewsItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        uniqueId: doc.data().uniqueId,
        title: doc.data().title,
        category: doc.data().category,
        author: doc.data().author,
        images: doc.data().images,
        description: doc.data().description,
        lastEdited: doc.data().lastEdited,
      }));

      const storage = getStorage();
      const updatedNewsData = await Promise.all(
        newsData.map(async (item) => {
          const imageUrls = await Promise.all(
            item.images.map(async (imagePath) => {
              const imageRef = ref(storage, imagePath);
              return await getDownloadURL(imageRef);
            })
          );
          return { ...item, images: imageUrls };
        })
      );

      setNews(updatedNewsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Timestamp datani olib format qilamiz
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const dateString = date.toLocaleDateString(undefined, options);
    const timeString = date.toLocaleTimeString(undefined, timeOptions);
    return `date: ${dateString} time: ${timeString}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* // back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute mb-6 px-4 py-1 text-white text- bg-trasnparent text-white rounded hover:bg-gray-500 transition  z-10"
        // className="mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 transition"
      >
        &#8592;
      </button>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4">
              <div className="rounded bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-gray-500 p-40"> No news found!</div>
      ) : (
        <div className="space-y-8 pt-20">
    {news.map((item) => {
      const sentences = item.description
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean);

      return (
        <div
          key={item.id}
          className="p-6 border rounded-md shadow-md bg-neutral-800 text-white"
        >
          <h2 className="text-2xl font-semibold mb-10">{item.title}</h2>
          
          {/* Container to arrange text and image side-by-side on larger screens, stacked on mobile */}
          <div className="md:flex md:items-start md:justify-between">
            <div className="text-gray-300 space-y-4 md:flex-1">
              {sentences.map((sentence, index) => (
                <p key={index}>{sentence}.</p>
              ))}
            </div>
            
            {item.images && item.images.length > 0 ? (
              <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-[150px] h-auto object-contain rounded"
                />
              </div>
            ) : (
              <div className="mt-4 md:mt-0 w-[50px] h-[50px] bg-gray-300 rounded md:ml-4 flex-shrink-0">
                No Image
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-400 pt-40">
            {formatDate(item.lastEdited)}
          </div>
        </div>
      );
    })}
  </div>
      )}
    </div>
  );
}
