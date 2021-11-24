import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import styles from "./Sidebar.module.css";

import { signOut, useSession } from "next-auth/client";

const Sidebar = ({ selected, setSelected }) => {
  const [session, loading] = useSession();
  const router = useRouter()

  const onClick = (route) => {
    setSelected(route);
  };

  const logOut = () => {
    signOut()
    router.replace('/signin')
  }

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.sidebar}>
        <div className={styles.logo_details}>
          <i className="bx bx-headphone" />
          <div className={styles.logo_name}>
            <h4>Personify</h4>
            <i className="bx bx-menu" />
          </div>
        </div>
        <ul className={styles.nav_list}>
          <li onClick={() => onClick("top_tracks")} className={selected === 'top_tracks' ? styles.selected: ''}>
            <i className="bx bx-music" />
            <span className={styles.links_name}>Top Tracks</span>
          </li>
          <li onClick={() => onClick("top_artists")} className={selected === 'top_artists' ? styles.selected: ''}>
            <i className="bx bx-podcast" />
            <span className={styles.links_name}>Top Artists</span>
          </li>
          <li onClick={() => onClick("recent")} className={selected === 'recent' ? styles.selected: ''}>
            <i className="bx bx-time-five" />
            <span className={styles.links_name}>Recent</span>
          </li>
          <li onClick={() => onClick("recommended")} className={selected === 'recommended' ? styles.selected: ''}>
            <i className="bx bx-disc" />
            <span className={styles.links_name}>Recommended</span>
          </li>

          <div className={styles.profile}>
            {session && (
              <>
                <div className={styles.profile_details}>
                  <div className={styles.profile_img}>
                    <Image
                      src={session.user.image ?? "/user.png"}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.profile_text}>
                    <div className={styles.name}>{session.user.name}</div>
                    <div className={styles.job}>{session.user.email}</div>
                  </div>
                </div>
                <i className="bx bx-log-out" id="log_out" onClick={logOut} />
              </>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
