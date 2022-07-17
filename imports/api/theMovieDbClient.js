import fetch from "node-fetch";
const MEDIA_STATUS = { ENDED: "Ended" };
const MIN_MEDIA_AMOUNT = 10;
export const fetchMedia = async (searchString) => {
  let medias = [];
  let page = 1;
  let totalPages = 1;
  while (medias.length <= MIN_MEDIA_AMOUNT && page <= totalPages) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=${page}&query=${searchString}`
    );
    const { results, total_pages } = await response.json();
    totalPages = total_pages;
    const mediasWithStatus = await Promise.all(
      results.map(async (result) => {
        const { status } = await fetch(
          `https://api.themoviedb.org/3/tv/${result.id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}`
        ).then((res) => {
          return res.json();
        });

        return { ...result, status };
      })
    );
    medias = [...medias, ...mediasWithStatus];
  }
  console.log(JSON.stringify(medias));
  return medias;
};
