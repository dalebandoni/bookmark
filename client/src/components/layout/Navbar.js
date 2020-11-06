import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  height: 7rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.main};
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  & .nav-container {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.mediaQueries['below-1200']} {
      max-width: 900px;
    }

    @media ${({ theme }) => theme.mediaQueries['below-768']} {
      max-width: 700px;
    }

    @media ${({ theme }) => theme.mediaQueries['below-480']} {
      max-width: 450px;
      flex-direction: column;
    }
  }

  & .logo {
    font-size: 2rem;
    font-weight: 'Noto Sans Jp';
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & .nav-links {
    list-style-type: none;
    display: flex;
  }

  & .nav-link a {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.main};
    text-decoration: none;
    margin-left: 6rem;
    padding: 1rem 0rem;
    border-bottom: 2px solid transparent;
    transition: border-bottom 200ms ease-in-out;

    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
    }
  }

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    height: 10rem;

    & .nav-links {
      width: 100%;
      justify-content: space-around;

      & a {
        margin: 0;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.mainVibrant};
      }
    }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className='nav-container'>
        <span className='logo'>BookMark</span>
        <ul className='nav-links'>
          <li className='nav-link'>
            <Link to={'/'}>My Books</Link>
          </li>
          <li className='nav-link success'>
            {' '}
            <Link to={'/add-book'}>Add Book</Link>
          </li>
        </ul>
      </div>
    </Nav>
  )
}

export default Navbar
