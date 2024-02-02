import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

// CSS
import './MoviesGrid.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');
  const apiKey = import.meta.env.VITE_API_KEY; // Sua chave da API do TMDb
  const userToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDA2NDFmYTRjMjViMDYxMzQwYjZmOGU1ZjBiMjAyYyIsInN1YiI6IjY1YmJlODUxY2ZmZWVkMDE3Y2FlMjVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zhvmePp36MsV0ojVPfpd3pNRRt5ymKBqZvZzPeaW73Q';

  const searchURL = '/api/3/search/movie'; // Use o caminho relativo ao proxy

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'api_key': apiKey,
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar filmes: ${res.statusText}`);
      }

      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.log(`Erro ao buscar filmes: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!query) {
      return; // Não faça a busca se a query não estiver definida
    }

    console.log("searchURL:", searchURL);
    const searchWithQueryURL = `${searchURL}?query=${query}`;
    console.log("searchWithQueryURL:", searchWithQueryURL);

    getSearchedMovies(searchWithQueryURL);
  }, [query, apiKey, searchURL, userToken]);

  return (
    <div className="container" id="container">
      <h2 className="title">
        Resultados para: <span className="query_text">{query}</span>
      </h2>

      <div className="movies-container">
        {movies.length === 0 && <h1>Carregando...</h1>}
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Search;
