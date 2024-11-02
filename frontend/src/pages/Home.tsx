import React from "react";

// Components
import Carousel from "../components/Carousel";

const Home = () => {
  const trending = [
    "src/assets/images/joker2.webp",
    "src/assets/images/batman.jpg",
    "src/assets/images/god-of-war.jpg",
  ];

  const movies = [
    "src/assets/images/45719.jpg",
    "src/assets/images/107184.jpg",
    "src/assets/images/107263g.jpg",
    "src/assets/images/107308g.jpg",
    "src/assets/images/5167951.jpg",
    "src/assets/images/530814.jpg",
  ];

  const series = [
    "src/assets/images/107200g.jpg",
    "src/assets/images/107258g.jpg",
    "src/assets/images/107266g.jpg",
    "src/assets/images/107282g.jpg",
    "src/assets/images/107200g.jpg",
    "src/assets/images/107258g.jpg",
  ];

  const games = [
    "src/assets/images/60086.jpg",
    "src/assets/images/60164.jpg",
    "src/assets/images/60180.jpg",
    "src/assets/images/107117.jpg",
    "src/assets/images/60086.jpg",
    "src/assets/images/107117.jpg",
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
