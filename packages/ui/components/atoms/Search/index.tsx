import React from "react";

const Search = () => {
  return (
    <div className="w-full">
      <p className="text-dark-grey text-sm">Поиск по врачу, болезни, услуге</p>
      <div className="flex space-x-1">
        <div className="p-1 rounded-sm w-5/6 bg-gradient-to-b from-light-pink to-light-blue">
          <input
            type="text"
            className="py-2 px-4 focus:outline-none w-full h-full"
            placeholder="Например: Эндокринолог или УЗИ"
          />
        </div>
        <button className="bg-light-pink text-white py-4 px-3 rounded-sm">
          Найти
        </button>
      </div>
    </div>
  );
};

export default Search;
