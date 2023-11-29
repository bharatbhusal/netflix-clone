// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import env from "./utils/validateEnv";
import RectangleLogo from "./images/Netflix name.png"
import SquareLogo from "./images/Netflix_Avatar.jpg"

const api = env.REACT_APP_API_KEY;
const base_url = env.REACT_APP_BASE_URL;
const banner_url = env.REACT_APP_BANNER_URL;
const img_url = env.REACT_APP_IMAGE_URL;

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
    // Add other fetch requests as needed
};

function App() {
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [documentaries, setDocumentaries] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);
    useEffect(() => {
        const fetchData = async (url, setStateFunction) => {
            const response = await fetch(url);
            const data = await response.json();
            setStateFunction(data.results);
        };

        const fetchRandomMovie = async () => {
            const response = await fetch(requests.fetchNetflixOriginals);
            const data = await response.json();
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            setRandomMovie(randomMovie);
        };

        fetchData(requests.fetchNetflixOriginals, setNetflixOriginals);
        fetchData(requests.fetchTrending, setTrendingMovies);
        fetchData(requests.fetchActionMovies, setActionMovies);
        fetchData(requests.fetchComedyMovies, setComedyMovies);
        fetchData(requests.fetchHorrorMovies, setHorrorMovies);
        fetchData(requests.fetchRomanceMovies, setRomanceMovies);
        fetchData(requests.fetchDocumentaries, setDocumentaries);
        fetchRandomMovie();
    }, []);

    const renderRow = (title, movies) => (
        <div className="row" key={title}>
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className="row__posterLarge"
                        src={img_url + movie.poster_path}
                        alt={movie.name}
                    />
                ))}
            </div>
        </div>
    );
    const NavBar = () => (
        <div className="nav">
            <div className="nav__left">
                <a href="/">
                    <img className="nav_logo" src={RectangleLogo} alt="Netflix Logo" />
                </a>
            </div>
            <div className="nav__right">
                <img src={SquareLogo} className="nav_avatar" alt="User Avatar" />
            </div>
        </div>
    )
    const Banner = () => (
        <header
            className="banner"
            style={{
                backgroundImage: `url(${banner_url}/${randomMovie?.backdrop_path})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{randomMovie?.name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">{randomMovie && truncate(randomMovie.overview, 150)}</p>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    )
    return (
        <div className="App">
            <NavBar />
            <Banner />
            <div className="headrow">
                {renderRow('Netflix Originals', netflixOriginals)}
                {renderRow('Trending Now', trendingMovies)}
                {renderRow('Action', actionMovies)}
                {renderRow('Comedy', comedyMovies)}
                {renderRow('Horror', horrorMovies)}
                {renderRow('Romance', romanceMovies)}
                {renderRow('Documentaries', documentaries)}
            </div>
        </div>
    );
}

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default App;
