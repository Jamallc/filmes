import React, { useEffect, useState } from 'react';
import { Container, ListMovies } from './styles'
import Header from '../../components/Header'
import { getMoviesSave, deletMovie } from '../../utils/storage'
import FavoriteItem from '../../components/FavoriteItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'

function Movies() {
  const [movies, setMovies] = useState([])
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getFavoreteMovies() {
      const result = await getMoviesSave('@primereact');

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoreteMovies();
    }

    return () => {
      isActive = false;
    }
  }, [isFocused])

  async function handleDelete(id) {
    const result = await deletMovie(id);
    setMovies(result)
  }

  return (
    <Container>
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
          />
        )}
      />
    </Container>
  )
}

export default Movies;