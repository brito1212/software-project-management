import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMedias, getSearchMedia } from "../../features/media/mediaApi";
import { Media } from "../../features/media/media.type";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { setSelectedTypes } from "../../features/filter/filterSlice";
import styles from "./SearchMedia.module.css";
import filtersIcon from "../../assets/icons/filters-icon.svg";
import MediaCard from "./MediaCard";

const SearchMedia = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const dispatch = useAppDispatch();
  const selectedTypes = useAppSelector((state) => state.filter.selectedTypes);

  const [openSelect, setOpenSelect] = React.useState<boolean>(false);
  const [medias, setMedias] = React.useState<Media[]>([]);
  const [errorMovie, setErrorMovie] = React.useState<string | null>(null);
  const [errorSerie, setErrorSerie] = React.useState<string | null>(null);
  const [errorGame, setErrorGame] = React.useState<string | null>(null);
  const error = errorMovie && errorSerie && errorGame;
  const [loading, setLoading] = React.useState<boolean>(false);

  // Atualiza os tipos selecionados
  const handleCheckboxChange = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type];
    dispatch(setSelectedTypes(updatedTypes));
  };

  async function searchMedia(
    name: string | null,
    types: string[] = ["movie", "serie", "game"]
  ) {
    // Mapeia os tipos para funções e mensagens de erro
    const searchFunctions: Record<string, (name: string) => Promise<any>> = {
      movie: () => getSearchMedia("movie", name),
      serie: () => getSearchMedia("serie", name),
      game: () => getSearchMedia("game", name),
    };

    const getAllFunctions: Record<string, () => Promise<any>> = {
      movie: () => getAllMedias("movie"),
      serie: () => getAllMedias("serie"),
      game: () => getAllMedias("game"),
    };

    const errorSetters: Record<string, (message: string) => void> = {
      movie: setErrorMovie,
      serie: setErrorSerie,
      game: setErrorGame,
    };

    try {
      setLoading(true);
      setMedias([]);

      ["movie", "serie", "game"].forEach((type) => {
        if (type in errorSetters) errorSetters[type]("Mídia não encontrada!");
      });

      const promises = types
        .filter((type) => type in searchFunctions)
        .map((type) =>
          (name ? searchFunctions[type](name) : getAllFunctions[type]())
            .then((res) => {
              setMedias((prevMedias) => [...prevMedias, ...res]);
              errorSetters[type]("");
            })
            .catch(() => errorSetters[type]("Mídia não encontrada!"))
        );

      await Promise.all(promises);
    } catch (error) {
      console.error("Erro geral:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    // Busca as mídias com base na query ou nos tipos selecionados
    searchMedia(
      query,
      selectedTypes.length > 0 ? selectedTypes : ["movie", "serie", "game"]
    );
  }, [query, selectedTypes]);

  if (loading) return <div>Loading...</div>;
  return (
    <section className={`${styles.search} anime-left`}>
      <div className={styles.filters}>
        <div
          className={styles.select}
          onClick={() => setOpenSelect(!openSelect)}
        >
          <span>CATEGORIA</span>{" "}
          <i className="fa-solid fa-chevron-down" color="#fff"></i>
          <div
            className={
              openSelect
                ? `${styles.items} ${styles.active}`
                : `${styles.items} `
            }
          >
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                value="filmes"
                onChange={() => handleCheckboxChange("movie")}
                checked={selectedTypes.includes("movie")}
              />
              <span className={styles.checkmark}>
                <i className="fa-solid fa-check" color="#000"></i>
              </span>
              <span>Filmes</span>
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                value="series"
                onChange={() => handleCheckboxChange("serie")}
                checked={selectedTypes.includes("serie")}
              />
              <span className={styles.checkmark}>
                <i className="fa-solid fa-check" color="#000"></i>
              </span>
              <span>Séries</span>
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                value="jogos"
                onChange={() => handleCheckboxChange("game")}
                checked={selectedTypes.includes("game")}
              />
              <span className={styles.checkmark}>
                <i className="fa-solid fa-check" color="#000"></i>
              </span>
              <span>Jogos</span>
            </label>
          </div>
        </div>
        <img src={filtersIcon} alt="Filters" width="25px" height="25px" />
      </div>
      <div className={styles["filters-applied"]}>
        <p>Filtros ativos: </p>
        {selectedTypes?.map((type) => (
          <div key={type} className={styles.type}>
            {type === "movie" && <span>Filmes</span>}
            {type === "serie" && <span>Séries</span>}
            {type === "game" && <span>Jogos</span>}
            <button onClick={() => handleCheckboxChange(type)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {medias.length !== 0 && (
        <div className={styles["medias-wrapper"]}>
          {medias.map((media, index) => (
            <MediaCard key={index} slide={media} cardWidth={220} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchMedia;
``;
