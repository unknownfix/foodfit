import styled from "styled-components";

interface Props {
  active: boolean;
}

const StyledMeal = styled.section<Props>`
  position: absolute;
  display: grid;
  grid-template-rows: max-content 1fr;
  background-color: #fff;
  height: 100%;
  width: 100%;
  transition: transform 0.7s ease-out;
  transform: ${(props) => {
    return props.active ? "translateY(0%)" : "translateY(-110%)";
  }};
  box-shadow: 0px 0px 9px 0px rgba(46, 74, 117, 1);

  & .header {
    position: relative;
    margin-top: 1rem;

    & .back-arrow {
      height: 100%;
      position: absolute;
    }

    & h1 {
      text-align: center;
    }

    //TODO create icons component
    & .arrow-icon {
      color: ${(props) => props.theme.colorSecondary};
      align-self: end;
      height: 100%;
      width: 2.5rem;
      cursor: pointer;
      margin-left: 1rem;
      justify-self: start;
      transform: rotate(180deg);

      & > i.arrow {
        display: block;
        height: 100%;
        width: 100%;
        background-color: currentColor;
        mask: url(/icons/arrow.svg) no-repeat center;
        mask-size: contain;
      }
    }
  }

  & .find {
    margin: 5rem 2rem 0;
    position: relative;

    //TODO create icons component
    & .icon {
      position: absolute;
      top: -2px;
      left: 0;
      width: 3rem;
      height: 3rem;
      color: ${(props) => props.theme.colorTertiary};

      & > i.search {
        display: block;
        height: 100%;
        width: 100%;
        background-color: currentColor;
        mask: url(/icons/search.svg) no-repeat center;
        mask-size: contain;
      }
    }

    & input {
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.colorTertiary};
      width: 100%;
      font-size: 2rem;
      font-weight: 500;
      font-family: inherit;
      padding-left: 4rem;
      padding-bottom: 1.2rem;
      color: ${(props) => props.theme.colorPrimary};

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colorBlue}};
      }

      &::placeholder {
        color: ${(props) => props.theme.colorTertiary};
        font-weight: 500;
        font-family: inherit;
      }
    }
  }

  & .products {
    background-color: ${(props) => props.theme.colorGray};
    margin-top: 5rem;
    padding: 0 2rem;
    overflow-y: scroll;

    & .empty {
      color: ${(props) => props.theme.colorPrimary};
      font-size: 2rem;
      text-align: center;
      margin-top: 2rem;

      & button {
        display: block;
        width: 14rem;
        height: 5rem;
        margin: 2rem auto 0;
        font-size: 1.8rem;
        background-color: ${(props) => props.theme.colorGreen};
        border: none;
      }
    }

    & > .list {
    }
  }

  & .modal-form {
      max-width: 37rem;
      margin: 3rem auto 0;
  }
`;

export default StyledMeal;
