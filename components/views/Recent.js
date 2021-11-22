import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import TrackContainer from "../userTracks/TrackContainer";

const options = [{ label: "50 most recent", value: "recent" }];
const option = options[0].label;

const Recent = () => {
  const { status, error, data } = useQuery(["recent"], async () => {
    const { data } = await axios.get(`/api/recent`);
    return data;
  });

  return (
    <TrackContainer
      title="Recent"
      data={data}
      option={option}
      options={options}
    />
  );
};

export default Recent;
