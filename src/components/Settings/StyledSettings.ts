import styled from "styled-components";

const StyledSettings = styled.section`
  margin: 0 2rem;

  & h1 {
    margin-top: 1rem;
    text-align: center;
  }

  & .form-container {
      max-width: 37rem;
      margin: 3rem auto 0;

      & .save-button {
        margin-top: 3rem;
      }
    }

  /* & .gender {
    margin-top: 2rem;
    display: grid;
    grid-auto-flow: column;
    justify-items: center;
    justify-content: space-evenly;

    & .item {
      & input:checked ~ label {
        background-color: ${(props) => props.theme.colorGreen};
        color: #ffff;
        border: none;
      }

      & label {
        display: grid;
        justify-items: center;
        align-items: end;
        border-radius: 5px;
        width: 12.5rem;
        height: 12.5rem;
        background-color: #ffff;
        color: ${(props) => props.theme.colorTertiary};
        border: solid 2px ${(props) => props.theme.colorGray};
        text-align: center;
        cursor: pointer;

        & i {
          display: block;
          height: 5.5rem;
          width: 5.5rem;

          &.man {
            background-color: currentColor;
            mask: url(/icons/male.svg) no-repeat center;
            mask-size: contain;
          }

          &.woman {
            background-color: currentColor;
            mask: url(/icons/female.svg) no-repeat center;
            mask-size: contain;
          }
        }

        & span {
          display: block;
          font-size: 2rem;
          font-weight: 600;
        }
      }
    }
  }

  & .slider {
    & input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }

    & input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    & input[type="range"]:focus {
      outline: none;
    }

    & input[type="range"]::-ms-track {
      width: 100%;
      cursor: pointer;

      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 30px;
      width: 5px;
      border-radius: 3px;
      background: ${(props) => props.theme.colorGreen};
      cursor: pointer;
      //margin-top: -14px;
    }
  } */
`;

export default StyledSettings;
