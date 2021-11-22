import { getSession } from "next-auth/client";
import { useState } from "react";
import Discover from "../../components/discover/Discover";
import Sidebar from "../../components/sidebar/Sidebar";
import Recent from "../../components/views/Recent";
import Recommended from "../../components/views/Recommended";
import TopArtists from "../../components/views/TopArtists";
import TopTracks from "../../components/views/TopTracks";

import styles from "../../styles/Dashboard.module.css";

const Dashboard = () => {
  const [selected, setSelected] = useState("top_tracks");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar setSelected={setSelected} selected={selected} />
        </div>
        <div className={styles.body}>
          <Discover />
            {selected === "top_tracks" ? (
              <TopTracks />
            ) : selected === "top_artists" ? (
              <TopArtists />
            ) : selected === "recent" ? (
              <Recent />
            ) : selected === "recommended" ? (
              <Recommended />
            ) : (
              ""
            )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
   
  return {
    props: {
        session,
    }
  }
}

export default Dashboard;
