import React from "react";
import { useSelector } from "react-redux";
import D3model from "./D3model";

const Objects = () => {
  const { objects } = useSelector((state) => state.objects);
  return objects.map(({ url, type }) => (
    <D3model key={url} url={url} type={type} />
  ));
};

export default Objects;
