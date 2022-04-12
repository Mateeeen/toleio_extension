import iconLogo from '../assets/icons/logo.png'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: 32px;
  justify-content: flex-start;
  padding: 0px;
  margin: 0px 0px 18px 0px;
  span {
    font-size: 1.2rem;
    margin-right: 7px;
  }
`

const Logo = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 12px;
`

const Title = styled.span`
  color: black;
  font-size: 18px !important;
`
const Description = styled.span`
  font-size: 18px !important;
  color: #a3a3a3;
`

const Header: React.FC<any> = () => {
  return (
    <Container>
      <Logo src={iconLogo} alt="Toleio Logo" />
      <Title>Toleio</Title>
      <Description>Tegnspråk Ordbok</Description>
    </Container>
  )
}

export default Header
