import React from 'react'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  RateContainer,
  Rate,
  Title,
  DetailButton,
  ActionContainer,
  DeleteButton
} from './styles'

function FavoriteItem({ data, deleteMovie }) {

  const navigation = useNavigation()

  const navigateDetailsPage = (item) => {
    navigation.navigate('Detail', {id: item.id})
  }

  return (
    <Container>
      <Title size={22}>{data.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigateDetailsPage(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => deleteMovie(data.id)}>
          <Feather
            size={24}
            color="#fff"
            name="trash"
          />
        </DeleteButton>
      </ActionContainer>

    </Container>
  )
}

export default FavoriteItem;