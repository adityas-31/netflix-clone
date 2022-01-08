// import { selectOptions } from '@testing-library/user-event/dist/select-options';
import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css"
const base_url = 'https://image.tmdb.org/t/p/original';


function Row({title , fetchUrl , isLargeRow}){

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    //when the row loads, we want to make a request
    useEffect(() =>{
        async function fetchData() {

            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]); //if [] blank, then run only once and don't load again. fetchUrl is used here because dependency is present (it is from outside the useEffect)
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        },

    };

    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.original_name)
            .then( (url) =>{
                const urlParams = new URLSearchParams(url?new URL(url).search: new URL("rick roll").search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))
        }
    }

    return(
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map((movie) => (
                    
                    <img
                     key={movie.id}
                     onClick={() => handleClick(movie)}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                     alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts} />}
        </div>
    );
}

export default Row