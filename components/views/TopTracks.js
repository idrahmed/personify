import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import TrackContainer from "../userTracks/TrackContainer";

const options = [
  { label: "All time", value: "long_term" },
  { label: "Last 6 months", value: "medium_term" },
  { label: "Last month", value: "short_term" },
];

const TopTracks = () => {
  const [option, setOption] = useState({value: options[0].value, label: options[0].label});

  const { status, error, data } = useQuery(["topTracks", option.value], async () => {
    const { data } = await axios.get(`/api/top_tracks/${option.value}`);
    return data;
  });

  return (
    <TrackContainer
      title="Top Tracks"
      data={data}
      options={options}
      option={option.label}
      changeOption={setOption}
    />
  );
};

export default TopTracks;
