import { useState, useCallback } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { upcomingEventsAtom, pastEventsAtom } from "@/atoms/events";
import { Event } from "@/types";
import {
  ApiResponse,
  MeetupResponse,
  PageResponse,
  PaginationState,
  UseFetchEventsOptions,
} from "@/types/hook";

/**
 * We convert the MeetupResponse to our frontend Event type
 */
const convertMeetupToEvent = (meetup: MeetupResponse): Event => {
  return {
    id: meetup.id.toString(),
    title: meetup.title,
    description: meetup.description,
    date: meetup.meetupDate,
    location: meetup.location,
    maxSeats: meetup.maxSeats,
    imageUrl: meetup.imageURL,
    imageUrls: meetup.imageURL ? [meetup.imageURL] : [],
    parking: meetup.parking,
  };
};

/**
 * Events Custom Hook - Fetches the Data from Backend
 */

export default function useFetchEvent() {
  const [events, setEvents] = useState<MeetupResponse[]>([]);
  const [singleEvent, setSingleEvent] = useState<MeetupResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    size: 10,
    isFirst: true,
    isLast: false,
    isEmpty: true,
  });

  const setUpcomingEvents = useSetRecoilState(upcomingEventsAtom);
  const setPastEvents = useSetRecoilState(pastEventsAtom);

  /**
   * Fetch a list of events with optional filtering
   */
  const fetchEvents = useCallback(
    async ({
      page = 0,
      size = 10,
      type = "upcoming",
      onSuccess,
      onError,
    }: UseFetchEventsOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<
          ApiResponse<PageResponse<MeetupResponse>>
        >("http://localhost:8080/api/meetups", {
          params: {
            page,
            size,
            type,
          },
        });

        const apiResponse = response.data;

        if (apiResponse.success) {
          const pageData = apiResponse.data;
          setEvents(pageData.content);

          // we update pagination state
          setPagination({
            totalPages: pageData.totalPages,
            totalElements: pageData.totalElements,
            currentPage: pageData.number,
            size: pageData.size,
            isFirst: pageData.first,
            isLast: pageData.last,
            isEmpty: pageData.empty,
          });

          // update recoil state based on the event type
          const convertedEvents = pageData.content.map(convertMeetupToEvent);
          if (type === "upcoming") {
            setUpcomingEvents(convertedEvents);
          } else if (type === "past") {
            setPastEvents(convertedEvents);
          }

          if (onSuccess) onSuccess(pageData);
        } else {
          throw new Error(apiResponse.message);
        }
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    },
    [setUpcomingEvents, setPastEvents]
  );

  /**
   * Fetch a single event by event's id
   */
  const fetchEventById = useCallback(
    async ({ id, onSuccess, onError }: UseFetchEventsOptions) => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse<MeetupResponse>>(
          `http://localhost:8080/api/meetups/${id}`
        );
        const apiResponse = response.data;

        if (apiResponse.success) {
          setSingleEvent(apiResponse.data);
          if (onSuccess) onSuccess(apiResponse.data);
        } else {
          throw new Error(apiResponse.message);
        }
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await fetchEvents({ type: "upcoming" });
      await fetchEvents({ type: "past" });
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  return {
    events,
    singleEvent,
    pagination,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    fetchAllEvents,
  };
}
