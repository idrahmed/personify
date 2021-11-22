import { useMutation } from "react-query";
import styles from "./TrackContainer.module.css";
import Track from "./Track";
import Select from "react-select";
import axios from "axios";
import Modal from "../modal/Modal";
import { useState } from "react";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
  }),
};

const TrackContainer = ({ title, data, options, option, changeOption }) => {
  const [open, setOpen] = useState(false)

  const {mutate, data: newPlaylist, isLoading, isError} = useMutation(async newPlaylistData => {
    const res = await axios.post("/api/create_playlist", {
      newPlaylistData,
    });
    return res
  });

  const createPlaylist = () => {
    const name = `${title}-${option}`;
    const uris = data.tracks.map((track) => track.uri).join(",");
    mutate({ name, uris });
    setOpen(true)
  };

  return (
    <>
    {open && <Modal setOpen={setOpen} data={newPlaylist} loading={isLoading}/>}
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.heading_left}>
          <h1>{title}</h1>
          <button onClick={createPlaylist} className={styles.button}>
            Create Playlist
          </button>
        </div>
        <Select
          className={styles.select}
          options={options}
          styles={customStyles}
          isClearable={false}
          isSearchable={false}
          defaultValue={options[0]}
          onChange={(e) => changeOption({ value: e.value, label: e.label })}
        />
      </div>

      <ul className={styles.tracks}>
        {data?.tracks?.map((track) => (
          <li key={track.id}>
            <Track track={track} />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default TrackContainer;
