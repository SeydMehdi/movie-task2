import axios from "axios";
axios.defaults.baseURL = "http://api.themoviedb.org/3/";
axios.defaults.params = { api_key: "f62f750b70a8ef11dad44670cfb6aa57" };
export default axios;
export const discoverMovies = (page, searchQuery) => {
  let params = { page };
  if (searchQuery != undefined) params = { page, ...searchQuery };
  return axios.get("discover/movie", {
    params,
  });
};

export const getMovieCredit = (id: number, callBack) => {
  return axios
    .get(`movie/${id}/credits`)
    .then((result) => {
      return callBack(result.data);
    })
    .catch((response) => {
      console.log(response);
    });
};
export const getMovieDetail = (id: number, callBack) => {
  return axios
    .get(`movie/${id}`)
    .then((result) => {
      return callBack(result.data);
    })
    .catch((response) => {
      console.log(response);
    });
};

export const getImagePath = (fileName: string) => {
  if(fileName == null) {
    return "/images/unknown.png"
  }
  if (fileName.charAt(0) == "/") fileName = fileName.substr(1);
  return "https://image.tmdb.org/t/p/w500/" + fileName;
};
export const genreMovieList = (callBack) => {
  return axios
    .get("genre/movie/list")
    .then((result) => {
      return callBack(result.data.genres);
    })
    .catch((response) => {
      return callBack([
        { id: 12, name: "Adventure" },
        { id: 14, name: "Fantasy" },
        { id: 16, name: "Animation" },
        { id: 18, name: "Drama" },
        { id: 27, name: "Horror" },
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 53, name: "Thriller" },
        { id: 80, name: "Crime" },
        { id: 878, name: "Sceince Fiction" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 10751, name: "Family" },
      ]);
    });
};
