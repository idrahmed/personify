import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className={styles.blurred__wrapper}>
        <header className={`${styles.main__header} ${styles.container}`}>
          <p>Personify</p>
        </header>
        <section className={`${styles.hero} ${styles.container}`}>
          <div className={styles.content__wrapper}>
            <h5 className={styles.tagline}>Want to relive your music?</h5>
            <h1 className={styles.title}>
              View your <span style={{ color: "#1DB954" }}>spotify</span>{" "}
              highlights
            </h1>
            <p className={styles.message}>
              Includes your favourite tracks, artists, recents and even
              recommendations. Save them to a playlist!
            </p>
            <button onClick={() => signIn("spotify")} className={styles.btn}>
              Sign in with Spotify
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
