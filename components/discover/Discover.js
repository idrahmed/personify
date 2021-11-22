import styles from "./Discover.module.css";
import DiscoverTracks from "./DiscoverTracks";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useQuery } from "react-query";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 2100 },
    items: 7,
    slidesToSlide: 4,
  },
  desktopLarge: {
    breakpoint: { max: 2100, min: 1800 },
    items: 6,
    slidesToSlide: 4,
  },
  desktopMid: {
    breakpoint: { max: 1800, min: 1500 },
    items: 5,
    slidesToSlide: 3,
  },
  desktopSmall: {
    breakpoint: { max: 1500, min: 1300 },
    items: 4,
    slidesToSlide: 3,
  },
  desktopmXS: {
    breakpoint: { max: 1300, min: 1024 },
    items: 3,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2.5,
    slidesToSlide: 2,
  },
  miniTablet: {
    breakpoint: { max: 768, min: 500 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1.5,
  }
};

const Discover = () => {
  const { status, error, data } = useQuery(["discover"], async () => {
    const { data } = await axios.get("/api/discover");
    return data;
  });
  return (
    <div className={styles.container}>
      <h1>Discover popular songs</h1>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error}</span>
      ) : (
        <Carousel responsive={responsive}>
          {data?.items?.map((track) => (
            <DiscoverTracks key={track.id} track={track} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Discover;
