import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import ViewMedia from "../components/Media/viewMedia";
import { useAppDispatch } from "../app/store";
import { closeModal } from "../features/ui/uiSlice";
import { getMedia } from "../features/media/mediaApi";
import type { Media } from "../features/media/media.type";

const Media = () => {
  const { id } = useParams<{ id: string }>(); // Extract the id from the URL
  const dispatch = useAppDispatch();
  const [movieData, setMediaData] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    dispatch(closeModal());

    const fetchMedia = async () => {
      if (!id) {
        setError(new Error("No media ID found in the URL."));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const media = await getMedia(id); // Pass the ID to getMedia
        setMediaData(media);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="anime-left"
      style={{ display: "flex", flexDirection: "column", gap: "50px" }}
    >
      {movieData ? (
        <ViewMedia {...movieData} />
      ) : (
        <p>No media data available.</p>
      )}
    </div>
  );
};

export default Media;
