/*'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + "&page=" + currentPage
 * Make async calls in parallel by using Promise.all()
*/
function fetchPage(title, currentPage) {
  let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${currentPage}`;

  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      let movieInfoList = json.data;
      let result = [];

      movieInfoList.forEach(movie => {
        result.push(movie.Title);
      })
      //console.log(`result: ${result}`);
      return Promise.resolve(result);
    });
}

function getTotalPages(title) {
    let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=1`;
    return fetch(url)
    .then(resp => resp.json())
    .then(json => Promise.resolve(json.total_pages));
}

function getMovieTitles(title) {
  getTotalPages(title).then(totalPages => {
    let promises = [];
    for(let i = 1; i <= totalPages; i++) {
      promises.push(fetchPage(title, i));
    }

    let result = [];
    Promise.all(promises).then(listOfLists => {
      listOfLists.forEach(list => {
        result = result.concat(list)
      });
      result.sort();
      console.log(result);
    });
  })
}


getMovieTitles("Spiderman");


