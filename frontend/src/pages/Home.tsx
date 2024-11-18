import React from "react";

// Components
import { Carousel } from "../components";

import {
  TRENDING_ALL_GET,
  TRENDING_GAMES_POST,
  TRENDING_MOVIES_GET,
  TRENDING_SERIES_GET,
} from "../api/fetchApi";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    data: trending,
    error: errorTrending,
    loading: loadingTrending,
    request: requestTrending,
  } = useFetch();

  const {
    data: movies,
    error: errorMovies,
    loading: loadingMovies,
    request: requestMovies,
  } = useFetch();

  const {
    data: series,
    error: errorSeries,
    loading: loadingSeries,
    request: requestSeries,
  } = useFetch();

  const {
    data: games,
    error: errorGames,
    loading: loadingGames,
    request: requestGames,
  } = useFetch();

  const error = errorTrending || errorMovies || errorSeries || errorGames;
  const loading =
    loadingTrending || loadingMovies || loadingSeries || loadingGames;

  React.useEffect(() => {
    const getTrending = TRENDING_ALL_GET();
    requestTrending(getTrending.url, getTrending.options);

    const getMovies = TRENDING_MOVIES_GET();
    requestMovies(getMovies.url, getMovies.options);

    const getSeries = TRENDING_SERIES_GET();
    requestSeries(getSeries.url, getSeries.options);

    const getGames = TRENDING_GAMES_POST();
    requestGames(getGames.url, getGames.options);
  }, [requestTrending, requestMovies, requestSeries, requestGames]);

  if (error) return <div>Error...</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <article className="main-article anime-left">
      {trending && (
        <div>
          <Carousel
            slides={trending.results}
            cardWidth={220}
            numPerSlides={5}
            title={"Destaques"}
          />
        </div>
      )}
      {movies && (
        <div>
          <Carousel
            slides={movies.results}
            cardWidth={220}
            numPerSlides={5}
            title={"Filmes"}
          />
        </div>
      )}
      {series && (
        <div>
          <Carousel
            slides={series.results}
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
