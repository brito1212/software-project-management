import React from "react";

// Components
import { Carousel } from "../components";

const Home = () => {
  const trending = [
    "src/assets/images/movies/joker2.webp",
    "src/assets/images/movies/batman.jpg",
    "src/assets/images/movies/god-of-war.jpg",
  ];

  const movies = [
    "src/assets/images/movies/45719.jpg",
    "src/assets/images/movies/107184.jpg",
    "src/assets/images/movies/107263g.jpg",
    "src/assets/images/movies/107308g.jpg",
    "src/assets/images/movies/5167951.jpg",
    "src/assets/images/movies/530814.jpg",
  ];

  const series = [
    "src/assets/images/movies/107200g.jpg",
    "src/assets/images/movies/107258g.jpg",
    "src/assets/images/movies/107266g.jpg",
    "src/assets/images/movies/107282g.jpg",
    "src/assets/images/movies/107200g.jpg",
    "src/assets/images/movies/107258g.jpg",
  ];

  const games = [
    "src/assets/images/movies/60086.jpg",
    "src/assets/images/movies/60164.jpg",
    "src/assets/images/movies/60180.jpg",
    "src/assets/images/movies/107117.jpg",
    "src/assets/images/movies/60086.jpg",
    "src/assets/images/movies/107117.jpg",
  ];

  return (
    <article className="main-article anime-left">
      <div>
        <Carousel
          slides={trending}
          cardWidth={1240}
          numPerSlides={1}
          title={"Destaques"}
        />
      </div>
      <div>
        <Carousel
          slides={movies}
          cardWidth={280}
          numPerSlides={4}
          title={"Filmes"}
        />
      </div>
      <div>
        <Carousel
          slides={series}
          cardWidth={280}
          numPerSlides={4}
          title={"Series"}
        />
      </div>
      <div>
        <Carousel
          slides={games}
          cardWidth={280}
          numPerSlides={4}
          title={"Jogos"}
        />
      </div>
    </article>
  );
};

export default Home;
