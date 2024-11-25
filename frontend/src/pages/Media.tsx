import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewMediaMovie from "../components/Media/viewMediaMovie";
import ViewMediaGame from "../components/Media/viewMediaGame";
import ViewMediaSerie from "../components/Media/viewMediaSerie";
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchMedia } from "../features/media/mediaSlice";
import DeleteReview from "../components/review/DeleteReview";

const Media = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const dispatch = useAppDispatch();
  const { media, loading, error } = useAppSelector((state) => state.media);

  useEffect(() => {
    if (mediaType && id) {
      dispatch(fetchMedia(mediaType, id));
    }
  }, [dispatch, mediaType, id]);

  if (!mediaType || !id) {
    return <p>Invalid media type or ID in the URL.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let content;

  switch (mediaType) {
    case "movie":
      content = media ? <ViewMediaMovie {...media} /> : <p>No movie data available.</p>;
      break;
    case "game":
      content = media ? <ViewMediaGame {...media} /> : <p>No game data available.</p>;
      break;
    case "serie":
      content = media ? <ViewMediaSerie {...media} /> : <p>No series data available.</p>;
      break;
    default:
      content = <p>Unsupported media type.</p>;
      break;
  }

  return (
    <>
      <DeleteReview />
      <div
        className="anime-left"
        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
      >
        {content}
      </div>
    </>
  );
};

export default Media;
