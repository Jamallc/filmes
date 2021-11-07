import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar itens salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key)

  let moviesSave = JSON.parse(myMovies) || [];
  return moviesSave;
}

// Salvar filme
export async function saveMovie(key, newMovie) {
  let moviesStored = await getMoviesSave(key);

  // Se tiver alguim filme salvo com esse mesmo ID / ou duplicado precisamos ignorar.
  const hasMovie = moviesStored.some(item => item.id === newMovie.id);

  if (hasMovie) {
    alert('Esse filme já existe na sua lista!')
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
  alert('Filme salvo')
}

// Deletar filme
export async function deletMovie(id) {
  let moviesStored = await getMoviesSave('@primereact');

  let mymovies = moviesStored.filter(item => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('@primereact', JSON.stringify(mymovies))
  alert('Filme removido')
  return mymovies;
}



// Filtrar filme
export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@primereact');

  const hasMovie = moviesStored.find(item => item.id === movie.id)
  return !!hasMovie;
}
