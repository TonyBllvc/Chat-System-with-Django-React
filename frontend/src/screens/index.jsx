import React from "react";
import { Link } from "react-router-dom";
import withAuthentication from "../utils/withAuthentication";

function Home() {
  return (
    <>
      <div className="mb-5">
        Home
      </div>
    </>
  );
}


export default withAuthentication(Home)