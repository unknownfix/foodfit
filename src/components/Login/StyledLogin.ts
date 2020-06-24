import styled from "styled-components";

export default styled.section`
  grid-column: start-form / end-form;
  grid-row: 1;
  transition: all 0.8s ease-in-out;
  backface-visibility: hidden;

  & > .component {
    margin-top: 6rem;

    & > .header {
      text-align: center;

      & > h1 {
        font-size: 3.3rem;
        color: ${(props) => props.theme.colorPrimary};
      }

      & > span {
        display: block;
      }

      & a {
        color: ${(props) => props.theme.colorPrimary};
      }
    }

    & .form-container {
      max-width: 37rem;
      margin: 3rem auto 0;

      & .login-button {
        margin-top: 3rem;
      }
    }
  }

  &.inactive {
    transform: rotateY(180deg);
  }
`;
