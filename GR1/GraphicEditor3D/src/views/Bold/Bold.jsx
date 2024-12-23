import React from "react";
import classes from "./Bold.module.css";

const Bold = ({ children }) => {
  return <div className={classes.text}>{children}</div>;
};

export default Bold;
