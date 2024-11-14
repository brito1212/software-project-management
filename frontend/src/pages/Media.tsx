import React from "react";
import ViewMedia from "../components/Media/viewMedia";
import { useAppDispatch } from "../app/store";
import { closeModal } from "../features/ui/uiSlice";

const movieData = {
  title: "Duna: Parte Dois",
  genres: ["Ação", "Ficção Científica"],
  duration: "2h 46min",
  classification: '14',
  releaseDate: "26 de fevereiro de 2024",
  description: "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve evitar um futuro terrível que só ele pode prever.",
  imdbRating: 8.5,
  userRating: 4.5,
  cast: [
    { name: "Timothée Chalamet", character: "Paul Atreides" },
    { name: "Zendaya", character: "Chani" },
    // Add more cast members as needed
  ],
  posterUrl: "https://placehold.co/250x350"
};

const Media = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(closeModal());
  });
  return (
    <>
      <div
        className="anime-left"
        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
      >
        <ViewMedia {...movieData} />
      </div>
    </>
  );
};

export default Media;
