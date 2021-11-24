import { getSession } from "next-auth/client";
import axios from "axios";
import { useState } from "react";
import Discover from "../components/discover/Discover";
import Sidebar from "../components/sidebar/Sidebar";
import Recent from "../components/views/Recent";
import Recommended from "../components/views/Recommended";
import TopArtists from "../components/views/TopArtists";
import TopTracks from "../components/views/TopTracks";

import styles from "../styles/Dashboard.module.css";

const Dashboard = ({items}) => {
  const [selected, setSelected] = useState("top_tracks");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar setSelected={setSelected} selected={selected} />
        </div>
        <div className={styles.body}>
          <Discover items={items}/>
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
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  console.log(session.accessToken)

  const token = session.accessToken
  const {
    data: { tracks },
  } = await axios.get(
    "https://api.spotify.com/v1/recommendations?limit=20&seed_genres=pop",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const items = tracks.map((track) => ({
    id: track.id,
    title: track.name,
    uri: track.uri,
    subtitle: track.artists[0].name,
    images: track.album.images[1],
  }));

  return {
    props: {
      session,
      items
    },
  };
}

export default Dashboard;
