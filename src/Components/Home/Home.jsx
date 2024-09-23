import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = process.env.REACT_APP_API_KEY;
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const popular = "popular";
const nowPlayings = "now_playing";
const upcomingMovie = "upcoming";
const tvShow = "popular";
const trending = "trending";

const Card = ({ img }) => (
<img src={img} alt="cover" className="card" />
);

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item,index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows,setTvShows] = useState([]);
  const [genre,setGenre] = useState([]);

  useEffect(()=>{
    const fetchPopular = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchNowPlayings = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${nowPlayings}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    const fetchUpcomingMovies = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${upcomingMovie}?api_key=${apiKey}`);
      setUpcomingMovies(results);

    };
    const fetchTVShows = async()=>{
      const {data:{results}} = await axios.get(`${url}/tv/${tvShow}?api_key=${apiKey}`);
      setTvShows(results);
    };
    const fetchAllGenre = async()=>{
      const {data:{results}} = await axios.get(`${url}/${trending}/all/day?api_key=${apiKey}`);
      setGenre(results);
    };

    fetchAllGenre();
    fetchPopular();
    fetchNowPlayings();
    fetchUpcomingMovies();
    fetchTVShows();
  },[])

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[0]? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"rgb(5,5,5)"
      }}>
        {
          popularMovies[0]&&
          (
            <h1>{popularMovies[0].original_title}</h1>
          )
        }
        {
          popularMovies[0]&&
          (
            <p>{popularMovies[0].overview}</p>
          )
        }
        <div>
        <button><BiPlay/>Play</button>
        <button>My List<AiOutlinePlus/></button>
        </div>
      </div>
      <Row title={"Popular On Netflix"} arr={popularMovies}/>
      <Row title={"Movies"} arr={upcomingMovies}/>
      <Row title={"TV Shows"} arr={tvShows}/>
      <Row title={"Recently Added"} arr={nowPlayingMovies}/>
      <Row title={"My List"} arr={genre}/>
    </section>
  );
};

export default Home;
