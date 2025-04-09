import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) => {
  const { query } = await searchParams;
  return (
    <div className="flex h-screen justify-center items-center">
      <h1>Searching {query}</h1>
    </div>
  );
};

export default SearchPage;
