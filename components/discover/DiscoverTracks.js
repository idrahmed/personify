import Image from "next/image";
import Link from "next/link";
import styles from "./DiscoverTracks.module.css";

const DiscoverTracks = ({ track }) => {
  return (
    <Link href={track.uri}>
      <a>
        <div className={styles.container}>
          <div className={styles.img_container}>
            <Image
              unoptimized
              src={track.images.url}
              alt=""
              layout="fill"
              objectFit="cover"
              className={styles.track}
            />
          </div>
          <div className={styles.track_titles}>
            <h3>{track.title}</h3>
            <h4>{track.subtitle}</h4>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DiscoverTracks;
