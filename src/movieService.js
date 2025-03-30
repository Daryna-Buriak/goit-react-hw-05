import axios from "axios";

const url = "https://api.themoviedb.org/3";
const api_key =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmUzNzVhYzJjMDc1YzRkNDUwZjE0ZjE4NmFlNTIyNiIsIm5iZiI6MTc0MzI3MzQwOS42MzY5OTk4LCJzdWIiOiI2N2U4M2RjMTBlOGVlNjc4MTU2N2M4NTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rRlS7aIB5OPLPyZkKDt2q-6k9kyPt3o39gKD3kj1D0w";

export const fetchMovies = async () => {
  const resp = await axios.get(`${url}/trending/movie/day`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });
  return resp.data.results;
};

export const fetchMovieById = async (movieId) => {
  try {
    const resp = await axios.get(`${url}/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    });
    return resp.data;
  } catch (error) {
    "Error in fetchMovieById:", error;
    throw error;
  }
};

export const searchMovies = async (query) => {
  const resp = await axios.get(`${url}/search/movie`, {
    params: {
      language: "en-US",
      include_adult: false,
      query: query,
    },
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });
  return resp.data.results;
};

export const fetchMovieReviews = async (movieId) => {
  const resp = await axios.get(`${url}/movie/${movieId}/reviews`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });
  return resp.data.results;
};

export const fetchMovieCast = async (movieId) => {
  const resp = await axios.get(`${url}/movie/${movieId}/credits`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });

  return resp.data.cast;
};
