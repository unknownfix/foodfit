import styled from "styled-components";

export default styled.div`
  position: relative;
  margin-bottom: 3rem;

  & input {
    display:block;
    width: 100%;
    height: 3.5rem;
    font-size: 1.4rem;
    font-family: inherit;
    color: ${(props) => props.theme.colorPrimary};
    padding: 1.5rem 2rem;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    transition: all 0.3s;

    &:focus {
        outline: none;
        box-shadow: 0 0 3px rgba(${(props) => props.theme.colorBlueRgb}, 0.2);
        border-color: ${(props) => props.theme.colorBlue}};
    }

    &:focus:invalid {
        //border-bottom: 3px solid $color-secondary-dark;
    }

    &::placeholder {
        color: ${(props) => props.theme.colorTertiary};
    }
  }

  & input[type="submit"] {
    color: white;
    border: 1px solid ${(props) => props.theme.colorBlue};
    background-color: ${(props) => props.theme.colorBlue};
    padding: 0;
  }

  & label {
    position: absolute;
    top: 100%;
    left: 0;
    display: block;
    margin-left: 2rem;
    font-size: 1.3rem;
    font-weight: 700;
    transition: all .3s;
  }

  & span {
    position: absolute;
    top: 100%;
    left: 0;
    color: #ff4d4f;
    font-size: 1.3rem;
    transition: all .3s;
  }

  & input:placeholder-shown + label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2.5rem);
  }

  &.error {
    & input:placeholder-shown {
      border: 1px solid #ff4d4f;
    }
    label {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-2.5rem);
    }
    span {
      visibility: visible;
      opacity: 1;
      // transform: translateY(-100%);
    }
  }

  &:not(.error) {
    & span {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-2.5rem);
    }
  }

  &.typing {
    
  }
`;
