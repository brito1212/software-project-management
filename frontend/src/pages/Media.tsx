import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchMedia } from "../features/media/mediaSlice";
import DeleteReview from "../components/review/DeleteReview";
import ViewMedia from "../components/media/ViewMedia";
import { DeleteComment } from "../components/comments/DeleteComment";
import Loading from "../components/helper/Loading";

const Media = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const dispatch = useAppDispatch();
  const { media, loading, error } = useAppSelector((state) => state.media);
  const { modalData } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (mediaType && id) {
      dispatch(fetchMedia(mediaType, id));
    }
  }, [dispatch, mediaType, id]);

  if (!mediaType || !id) {
    return <p>Invalid media type or ID in the URL.</p>;
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // let content;

  // switch (mediaType) {
  //   case "movie":
  //     content = media ? (
  //       <ViewMediaMovie {...media} />
  //     ) : (
  //       <p>No movie data available.</p>
  //     );
  //     break;
  //   case "game":
  //     content = media ? (
  //       <ViewMediaGame {...media} />
  //     ) : (
  //       <p>No game data available.</p>
  //     );
  //     break;
  //   case "serie":
  //     content = media ? (
  //       <ViewMediaSerie {...media} />
  //     ) : (
  //       <p>No series data available.</p>
  //     );
  //     break;
  //   default:
  //     content = <p>Unsupported media type.</p>;
  //     break;
  // }

  return (
    <>
      {modalData?.type === "deleteReview" && <DeleteReview />}
      {modalData?.type === "deleteComment" && <DeleteComment />}
      <div
        className="anime-left"
        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
      >
        {media && <ViewMedia {...media} />}
      </div>
    </>
  );
};

export default Media;
