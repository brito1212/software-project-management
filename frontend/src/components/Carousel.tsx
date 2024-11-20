import React from "react";
import chevron from "../assets/icons/chevron-down.svg";
import styles from "./Carousel.module.css";
import { useNavigate } from "react-router-dom";
import MediaCard from "./media/MediaCard";

const Carousel = ({ slides, cardWidth, numPerSlides, title }) => {
  const [position, setPosition] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const totalSlides = slides.length;
  const percentage =
    ((cardWidth + 40) / (totalSlides * cardWidth + 40 * (totalSlides - 1))) *
    100;

  const nextSlide = () => {
    setPosition((pos) => pos - percentage);
    setCurrentSlide((prev) => prev + 1);
    if (currentSlide >= totalSlides - numPerSlides) {
      setPosition((pos) => pos + percentage);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const prevSlide = () => {
    setPosition((pos) => pos + percentage);
    setCurrentSlide((prev) => prev - 1);
    if (currentSlide <= 0) {
      setPosition((pos) => pos - percentage);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const navigate = useNavigate();
  const openMedia = () => {
    navigate("/midia/movie/2");
  };

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <section
        className={
          cardWidth == 1260
            ? `${styles.carousel} ${styles.main}`
            : styles.carousel
        }
      >
        <button className={styles.prev} onClick={prevSlide}>
          <img src={chevron} />
        </button>
        <div className={styles.wrapper}>
          <div
            className={styles.inner}
            style={{ transform: `translateX(${position}%)` }}
          >
            {slides.map((slide, index) => (
              <MediaCard
                key={index}
                slide={slide}
                cardWidth={cardWidth}
                type={slide.media_type}
              />
            ))}
          </div>
        </div>

        <button className={styles.next} onClick={nextSlide}>
          <img src={chevron} />
        </button>
      </section>
    </>
  );
};

export default Carousel;
