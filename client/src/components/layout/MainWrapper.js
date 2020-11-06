import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQueries['below-1000']} {
    max-width: 900px;
  }

  @media ${({ theme }) => theme.mediaQueries['below-768']} {
    max-width: 700px;
  }

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    max-width: 350px;
  }
`

const MainWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default MainWrapper
