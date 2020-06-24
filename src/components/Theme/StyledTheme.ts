import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  // This defines what 1rem is
  font-size: 62.5%; //1 rem = 10px

  @media only screen and (max-width: ${(props) => props.theme.bpLarge}) {
    font-size: 56.25%; //1 rem = 9px
  }

  @media only screen and (max-width: ${(props) => props.theme.bpMedium}) {
    font-size: 50%; //1 rem = 8px
  }

  @media only screen and (min-width: ${(props) => props.theme.bpHuge}) {
    font-size: 75%; //1 rem = 12px
  }
}

body {
  font-size: 1.4rem;
  font-family: ${(props) => props.theme.fontPrimary.join(",")};
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  min-height: 100vh;
  color: ${(props) => props.theme.colorSecondary};
}

::selection {
  color: #fff;
  background: ${(props) => props.theme.colorBlue};
}
`;
