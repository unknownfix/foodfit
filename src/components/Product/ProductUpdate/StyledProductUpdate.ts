import styled from "styled-components";

interface Props {
  active: boolean;
}

const StyledProductUpdate = styled.section<Props>`
  position: absolute;
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

  & .form-container {
    max-width: 37rem;
    margin: 3rem auto 0;

    & .save-button {
      margin-top: 3rem;
    }
  }
`;

export default StyledProductUpdate;
