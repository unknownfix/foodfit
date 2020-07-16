import styled from "styled-components";

export default styled.div`
  position: relative;
  margin-bottom: 3rem;

  & select {
    display:block;
    width: 100%;
    height: 3.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    font-family: inherit;
    color: ${(props) => props.theme.colorPrimary};
    padding: 0.7rem 1.6rem;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    transition: all 0.3s;

    &.empty {
      color: rgb(117, 117, 117);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 3px rgba(${(props) => props.theme.colorBlueRgb}, 0.2);
        border-color: ${(props) => props.theme.colorBlue}};
    }

    & option[disabled] {
      color: red;
    }
  }

  & select.empty + label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2.5rem);
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

  &.error {
    & select {
      border: 1px solid #ff4d4f;
    }
    span {
      visibility: visible;
      opacity: 1;
    }
  }

  &:not(.error) {
    & span {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-2.5rem);
    }
  }

`;
