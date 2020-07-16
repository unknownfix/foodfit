import styled from "styled-components";

export default styled.section`
  grid-column: start-form / end-form;
  grid-row: 1;
  transition: all 0.8s ease-in-out;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  & > .component {
    margin-top: 6rem;

    & > .header {
      text-align: center;

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

  &.active {
    transform: rotateY(0);
  }
`;
