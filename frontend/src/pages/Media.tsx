import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import ViewMedia from "../components/Media/viewMedia";
import { useAppDispatch, useAppSelector } from "../app/store";
import type { Media } from "../features/media/media.type";
import { fetchMedia } from "../features/media/mediaSlice";

const Media = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { media, loading, error } = useAppSelector((state) => state.media);

  console.log("ID from route:", id);

  useEffect(() => {
    dispatch(fetchMedia(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="anime-left"
      style={{ display: "flex", flexDirection: "column", gap: "50px" }}
    >
      {media ? <ViewMedia {...media} /> : <p>No media data available.</p>}
    </div>
  );
};

export default Media;
