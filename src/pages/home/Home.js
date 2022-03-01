import './home.scss';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import API_KEY from '../../js/apiKey';
// import { GenreContext } from '../../context/GenreContext';
// import useGenre from '../../hooks/useGenre';
const Home = ({ type }) => {
  // const { genres, setGenres } = useContext(GenreContext);
  // const {} = useGenre();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('');
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getRandomList = async () => {
      try {
        const key = API_KEY;
        const url = `https://api.themoviedb.org/3`;
        const api = `${url}/genre/movie/list?${key}`;
        const response = await fetch(api);
        const data = await response.json();
        const genre = await data.genres.slice(0, 10);
        setGenres(genre);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomList();
  }, []);
  return (
    <div className="home">
      <Navbar />
      <Featured
        type={type}
        genres={genres}
        setSelectedCategory={setSelectedCategory}
        setSelectedOptions={setSelectedOptions}
      />
      {selectedCategory === 'Genre' || selectedCategory === '' ? (
        genres.map((genre, index) => <List key={index} genre={genre} />)
      ) : (
        <List
          selectedCategory={selectedCategory}
          selectedOptions={selectedOptions}
        />
      )}
    </div>
  );
};

export default Home;
