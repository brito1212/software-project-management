import React from "react";

// Components
import { Carousel } from "../components";
import { getAllMedias } from "../features/media/mediaApi";

const Home = () => {
  const [movies, setMovies] = React.useState(null);
  const [series, setSeries] = React.useState(null);
  const [games, setGames] = React.useState(null);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getMovies() {
    try {
      setError(null);
      setLoading(true);
      // await fillDatabase();
      const resMovies = await getAllMedias("movie");
      const resSeries = await getAllMedias("serie");
      const resGames = await getAllMedias("game");
      setMovies(resMovies);
      setSeries(resSeries);
      setGames(resGames);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <article className="main-article anime-left">
      <h1 style={{ marginLeft: "60px", fontSize: "2rem" }}>
        Principais Destaques
      </h1>
      {movies && (
        <div>
          <Carousel
            slides={movies}
            cardWidth={220}
            numPerSlides={5}
            title={"Filmes"}
          />
        </div>
      )}
      {series && (
        <div>
          <Carousel
            slides={series}
            cardWidth={220}
            numPerSlides={5}
            title={"Séries"}
          />
        </div>
      )}
      {games && (
        <div>
          <Carousel
            slides={games}
            cardWidth={220}
            numPerSlides={5}
            title={"Jogos"}
          />
        </div>
      )}
    </article>
  );
};

export default Home;
