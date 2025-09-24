import React from "react";
import "../../styles/Loading.css";

export default function Loading() {
  return (
    <div className="loading-page">
      <div className="loader">
        <div style={{ "--i": 0 }}></div>
        <div style={{ "--i": 1 }}></div>
        <div style={{ "--i": 2 }}></div>
        <div style={{ "--i": 3 }}></div>
        <div style={{ "--i": 4 }}></div>
      </div>
    </div>
  );
}
