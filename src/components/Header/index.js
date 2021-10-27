import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Container, MenuButton, Title } from './styles'
import { useNavigation } from '@react-navigation/native'

function Header({ title }) {

  const navigation = useNavigation();

  return(
    <Container>
      <MenuButton onPress={ () => navigation.openDrawer() }>
        <Feather
          size={36}
          color="#fff"
          name="menu"
        />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  )
}

export default Header;