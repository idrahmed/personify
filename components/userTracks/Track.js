import styles from "./Track.module.css";
import Image from "next/image";
import Link from "next/link";

// track element for every track,artist,recent,recommendation

const Track = ({ track }) => {
  return (
    <Link href={track.uri}>
      <a className={styles.container}>
        <div className={styles.title}>
          <div className={styles.images}>
            <Image
              unoptimized
              src={track.images?.url || " "}
              alt=""
              layout="fill"
              objectFit="cover"
              className={styles.image}
            />
          </div>
          <h4>{track.title}</h4>
        </div>
        <div className={styles.artist}>
          <h4>{track.subtitle}</h4>
        </div>

        <div className={styles.interactive}>❤️</div>
      </a>
    </Link>
  );
};

export default Track;
