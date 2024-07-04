import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="text-black border border-black rounded-full w-96 px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="text-black py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default SearchBar;
