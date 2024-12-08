import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { NewsItem } from "../../../types";
import { Spin } from "antd";

export default function NewsDetails() {
  const { category, id } = useParams<{category: string,  id: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Replace the fetchNews function body with the following code:

  const fetchNews = async () => {
    if (!id) {
      console.error("No event ID provided in the URL.");
      setLoading(false);
      return;
    }

    try {
      // Directly fetch the specific document by ID
      const docRef = doc(db, "news", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("No such document!");
        setLoading(false);
        return;
      }

      const data = docSnap.data();
      // Ensure it's of category 'category'
      if (data.category !== category) {
        console.error("This news item does not belong to the tech category.");
        setLoading(false);
        return;
      }

      const item: NewsItem = {
        id: docSnap.id,
        uniqueId: data.uniqueId,
        title: data.title,
        category: data.category,
        author: data.author,
        images: data.images,
        description: data.description,
        lastEdited: data.lastEdited,
      };

      // Fetch image URLs from Firebase Storage
      const storage = getStorage();
      const imageUrls = await Promise.all(
        (item.images ?? []).map(async (imagePath: string) => {
          const imageRef = ref(storage, imagePath);
          return await getDownloadURL(imageRef);
        })
      );
      item.images = imageUrls;

      setNews([item]); // Set single item in array for consistent rendering
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, id]);

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
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
          <Spin tip="Wait a little bit" size="large"></Spin>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-gray-500 p-40"> No news found!</div>
      ) : (
        <div className="space-y-8 pt-20">
          {news.map((item) => {
            const description = item.description ?? "";
            const sentences = description
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
                    {sentences.map((sentence: string, index: number) => (
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
                  {item.lastEdited
                    ? formatDate(item.lastEdited)
                    : "No date available"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
