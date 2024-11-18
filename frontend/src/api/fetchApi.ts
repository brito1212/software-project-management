const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2U2ZWIxNzQ5MGZhYTg4ZDk1ZDZjMzNkZGFhOGRjZiIsIm5iZiI6MTczMTY0NzM5Mi45NDUxOTU0LCJzdWIiOiI2NzM2YzlkZmQ0ZmZiYTFlOGIyYjBmZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dW6hm-dndISRLFUO9wodh--g7gF4qpBuAKFkKzS-e2g",
  },
};

export function TRENDING_ALL_GET() {
  return {
    url: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    options,
  };
}

export function TRENDING_MOVIES_GET() {
  return {
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options,
  };
}

export function TRENDING_SERIES_GET() {
  return {
    url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    options,
  };
}

export function TRENDING_GAMES_POST() {
  return {
    url: "http://localhost:3002/games",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
