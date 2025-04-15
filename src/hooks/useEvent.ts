import { Event } from "../types";
import { useEffect, useState } from "react";

export default function useEvents(type: "past" | "upcoming") {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await fetch(`/api/events?type=${type}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching the events." + error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [type]);

  return {
    data: { data: events, loading },
  };
}
