import React from "react";
import Layout from "../components/Layout";
import SearchedProducts from "../components/SearchedProducts";

const Search = () => {
  return (
    <Layout>
      <div className="page-wrapper">
        <SearchedProducts />
      </div>
    </Layout>
  );
};

export default Search;
