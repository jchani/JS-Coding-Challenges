/*'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + "&page=" + currentPage
 *Recursive approach. Only one asynchronous call writing to result array at a time
*/
function appendPage(title, result, currentPage = 1) {
  let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${currentPage}`;

  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      let movieInfoList = json.data;
      let totalPages = json.total_pages;

      movieInfoList.forEach(movie => {
        result.push(movie.Title);
      })

      if(currentPage <= totalPages) {
        return appendPage(title, result, currentPage+1);
      } else {
        //console.log(`result: ${result}`);
        return Promise.resolve(result);
      }
    });
}

function getMovieTitles(title) {
  return appendPage(title, []).then(titles => {
    titles.sort();
    console.log(titles);
  });
}

getMovieTitles("Waterworld");


