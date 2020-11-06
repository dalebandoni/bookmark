import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.div`
  padding: 1rem 1.5rem;
  display: inline;
  background: ${({ theme }) => theme.colors.mainVibrant};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 1;
  transition: background 200ms ease-in-out;

  & .link {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.mainVibrant};
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);

      & .link {
        text-decoration: none;

        &:visited {
          color: ${({ theme }) => theme.colors.mainVibrant};
        }
      }
    `}

  ${({ inline }) =>
    inline &&
    css`
      margin-right: 2rem;
    `}
`

const StyleButton = ({ secondary, inline, children }) => {
  return (
    <StyledButton secondary={secondary} inline={inline}>
      {children}
    </StyledButton>
  )
}

export default StyleButton
