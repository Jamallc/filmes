import React, { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  Title,
  ButtonLink,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from "./styles";
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import api, { key } from '../../services/api'
import Stars from 'react-native-stars'
import Genres from '../../components/Genres'
import ModalLink from '../../components/ModalLink'
import { saveMovie, hasMovie, deletMovie } from '../../utils/storage'

function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const [movie, setMovie] = useState({})
  const [openLink, setOpenLink] = useState(false)
  const [favoritedMovie, setFavoritedMovie] = useState(false)

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      const response = await api.get(`movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR'
        }
      })
        .catch((err) => {
          console.log(err)
        })

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data)
        setFavoritedMovie(isFavorite)
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
      ac.abort();
    }

  }, [])

  async function handlefavoriteMovie() {
    if (favoritedMovie) {
      await deletMovie(movie.id);
      setFavoritedMovie(false)
    } else {
      await saveMovie('@primereact', movie)
      setFavoritedMovie(true)
    }
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={28}
            color="#fff"
          />
        </HeaderButton>
        <HeaderButton onPress={() => handlefavoriteMovie(movie)}>
          <Ionicons
            name={favoritedMovie ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color="#fff"
          />
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={24} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
          emptyStar={<Ionicons name="md-star-outline" size={24} color="#e7a74e" />}
          halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>
      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descri????o</Title>
        <Description>
          {movie?.overview}
        </Description>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  )
}

export default Detail;