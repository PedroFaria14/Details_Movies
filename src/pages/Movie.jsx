import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import './Movies.css'


const movieURL= import.meta.env.VITE_API
const apiKey= import.meta.env.VITE_API_KEY



const Movie = () => {
  const {id} = useParams()
  const [movie,setMovie] = useState(null)

  const getMovie = async(url) => {
    const res = await fetch(url)
    const data =  await res.json()

   setMovie(data)
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US",{
      style: "currency",
      currency: "USD" 
    })
  } 

  useEffect(() => {
      const movieUrl = `${movieURL}${id}?${apiKey}`
      getMovie(movieUrl)
  },[])


  return (
    <div className='movie-page'>
    {movie && 
      ( 
        <div>
      <MovieCard movie={movie} showLink={false}/>
        <p className="tagline">
        {movie.tagline}
        </p>
          <div className="info">
          <h3>
          <BsWallet2/>Orçamento:
          </h3>

          <p>{formatCurrency(movie.budget)}</p>

          </div>
          <div className="info">
          <h3>
          <BsGraphUp/>Faturamento:
          </h3>

          <p>{formatCurrency(movie.revenue)}</p>

          </div>

          <div className="info">
          <h3>
          <BsHourglassSplit/>Duração:
          </h3>

          <p>{movie.runtime} Minutos</p>

          </div>

          
          <div className="info description">
          <h3>
          <BsFillFileEarmarkTextFill/>Descrição:
          </h3>

          <p>{movie.overiew} </p>

          </div>

      </div>
      )}

    </div>

  )
}

export default Movie
