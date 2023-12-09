// Importing React and necessary hooks from 'react'
import React, { useState, useEffect } from 'react';

// Importing the main stylesheet for the component
import './App.css';

// Importing environment variables from the 'validateEnv' utility
import env from "./utils/validateEnv";

// Importing image components
import RectangleLogo from "./images/Netflix name.png"
import SquareLogo from "./images/Netflix_Avatar.jpg"

// Extracting necessary API and URL details from environment variables
const api = env.REACT_APP_API_KEY;
const base_url = env.REACT_APP_BASE_URL;
const banner_url = env.REACT_APP_BANNER_URL;
const img_url = env.REACT_APP_IMAGE_URL;

// Defining various API requests for fetching movie data
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

// Main functional component App
function App() {
    // State variables to hold movie data
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [documentaries, setDocumentaries] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Function to fetch data from a given URL and update the corresponding state variable
        const fetchData = async (url, setStateFunction) => {
            const response = await fetch(url);
            const data = await response.json();
            setStateFunction(data.results);
        };

        // Function to fetch a random movie from Netflix Originals
        const fetchRandomMovie = async () => {
            const response = await fetch(requests.fetchNetflixOriginals);
            const data = await response.json();
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            setRandomMovie(randomMovie);
        };

        // Fetching data for various categories and the random movie
        fetchData(requests.fetchNetflixOriginals, setNetflixOriginals);
        fetchData(requests.fetchTrending, setTrendingMovies);
        fetchData(requests.fetchActionMovies, setActionMovies);
        fetchData(requests.fetchComedyMovies, setComedyMovies);
        fetchData(requests.fetchHorrorMovies, setHorrorMovies);
        fetchData(requests.fetchRomanceMovies, setRomanceMovies);
        fetchData(requests.fetchDocumentaries, setDocumentaries);
        fetchRandomMovie();
    }, []);

    // Function to render a row of posters for a given category
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

    // Functional component for the navigation bar
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

    // Functional component for the banner
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

    // Main JSX structure of the component
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

// Function to truncate a string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Exporting the App component as the default export
export default App;
