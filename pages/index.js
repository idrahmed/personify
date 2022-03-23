import { getSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Discover from "../components/discover/Discover";
import Sidebar from "../components/sidebar/Sidebar";
import Recent from "../components/views/Recent";
import Recommended from "../components/views/Recommended";
import TopArtists from "../components/views/TopArtists";
import TopTracks from "../components/views/TopTracks";

import styles from "../styles/Dashboard.module.css";

const Dashboard = ({ items }) => {
  // state to select which option a user wants to get data for.
  const [selected, setSelected] = useState("top_tracks");

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar setSelected={setSelected} selected={selected} />
        </div>
        <div className={styles.body}>
          <Discover items={items} />
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
  // first get a user's session.
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // next make the request to get 20 tracks from the pop genre.
  const token = session.accessToken;
  const {
    data: { tracks },
  } = await axios.get(
    "https://api.spotify.com/v1/recommendations?limit=20&seed_genres=pop",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // clean up the items we received
  const items = tracks.map((track) => ({
    id: track.id,
    title: track.name,
    uri: track.uri,
    subtitle: track.artists[0].name,
    images: track.album.images[1],
  }));

  // return items as props
  return {
    props: {
      items,
    },
  };
}

export default Dashboard;
