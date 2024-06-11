import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './MovieApp.css';

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, []);

  const fetchMovies = async (searchKey = "", category = "") => {
    const type = searchKey ? "search" : "discover";
    const params = {
      api_key: API_KEY,
      query: searchKey,
    };
    if (category) {
      params.with_genres = category;
    }
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, { params });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchCategories = async () => {
    const {
      data: { genres },
    } = await axios.get(`${API_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });
    setCategories(genres);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    fetchMovies("", category.id);
  };

  return (
    <div className="app-container d-flex">
      <div className="sidebar text-light p-3">
        <h3>Categorías</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <ul>{category.name}</ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <form className="container mb-4" onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Buscar pelicula"
            className="form-control"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-primary mt-2">Buscar</button>
        </form>

        <div>
          <main>
            {movie ? (
              <div
                className="viewtrailer"
                style={{
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                }}
              >
                {playing ? (
                  <>
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="btn btn-danger mt-2">
                      Cerrar
                    </button>
                  </>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => setPlaying(true)}
                          type="button"
                        >
                          Reproducir Trailer
                        </button>
                      ) : (
                        "Lo siento, no hay trailer disponible"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </main>
        </div>

        <div className="container mt-3">
          <div className="row">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-md-2 mb-2"
                onClick={() => selectMovie(movie)}
              >
                <img
                  src={`${URL_IMAGE + movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded"
                />
                <h4 className="text-center text-light">{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
