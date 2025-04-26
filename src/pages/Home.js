import React from "react";
import Navbar from "../components/Navbar";

import Front from "../components/Front";
import Popular from "../components/Popular";
import Footer from "../components/Footer";
import MostLiked from "../components/MostLiked";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Navbar />

        <Front />
        <Popular />
        <MostLiked />
      </Layout>
    </>
  );
};

export default Home;
