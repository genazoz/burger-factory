import {createGlobalStyle} from "styled-components";
import {commonTheme} from "./themes";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  html {
    font-size: 16px;
    font-family: ${commonTheme.fonts.Inter};
    color: white;
    background-color: ${commonTheme.colors.lightWhite};
  }
  
  body::-webkit-scrollbar{
    display: none;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullpage-wrapper {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a, p {
    font-family: ${commonTheme.fonts.Inter};
    font-size: ${commonTheme.fontSizes.r};

    @media (max-width: ${commonTheme.media.mob}) {
      font-size: 15px;
    }
  }

  li {
    list-style-type: none;
  }

  input, button {
    font-family: ${commonTheme.fonts.Inter};
    font-weight: 500;
    
    outline: none;
    border: unset;
    background: transparent;
  }
  
  button {
    cursor: pointer;
  }

  #fp-nav ul li a span {
    background: #FFFFFF;
  }

  \:root {
    --unit: calc((100vw - 1650px) / 2);
    @media (max-width: ${commonTheme.media.desktop}) {
      --unit: 85px;
    }
    @media (max-width: ${commonTheme.media.desktopMd}) {
      --unit: 64px;
    }
    @media (max-width: ${commonTheme.media.tab}) {
      --unit: 64px;
    }
    @media (max-width: ${commonTheme.media.tabMd}) {
      --unit: 32px;
    }
    @media (max-width: ${commonTheme.media.mob}) {
      --unit: 24px;
    }
  }

  h1, h2, h3, h4 {
    font-weight: normal;
  }
`;

export default GlobalStyles;
