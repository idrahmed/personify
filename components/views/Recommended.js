import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import TrackContainer from "../userTracks/TrackContainer";

const options = [
  { label: "Top Tracks", value: "top_tracks" },
  { label: "Top Artists", value: "top_artists" },
  { label: "Recent", value: "recent" },
];

const Recommended = () => {
  const [option, setOption] = useState({value: options[0].value, label: options[0].label});
  const { status, error, data } = useQuery(
    ["recommended", option.value],
    async () => {
      const { data } = await axios.get(`/api/recommended/${option.value}`);
      return data;
    }
  );

  return (
    <TrackContainer
      title="Recommended"
      data={data}
      options={options}
      option={option.label}
      changeOption={setOption}
    />
  );
};

export default Recommended;
