import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');

html {
    height: 100%;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 62.5%;
}

body {
    background-color: #F9FAFB;
}

* {
    padding:0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
}
`
export default GlobalStyle
