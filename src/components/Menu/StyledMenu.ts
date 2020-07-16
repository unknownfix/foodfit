import styled from "styled-components";
import { lighten } from "polished";

const StyledMenu = styled.div`
  background-color: ${(props) => props.theme.colorPrimary};
  padding: 1rem 0 0;
  grid-row: start-menu / end-menu;
  grid-column: 1;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
  text-align: center;

  & > .item {
    position: relative;
    cursor: pointer;
    color: ${(props) =>
      props.theme.colorSecondary && lighten(0.1, props.theme.colorSecondary)};

    &.disabled {
      color: rgba(255, 255, 255, 0.1);
      cursor: not-allowed;
    }

    &:active {
      transform: scale(1.1);
    }

    &.active {
      color: #fff;
    }

    &.big {
      top: -2rem;
      margin-bottom: -2rem;

      & > .icon {
        height: 4.6rem;
      }
    }

    & > .icon {
      display: block;
      height: 2.5rem;
      width: auto;

      & > i {
        display: block;
        height: 100%;
        width: 100%;

        &.home {
          background-color: currentColor;
          mask: url(/icons/home.svg) no-repeat center;
          mask-size: contain;
        }

        &.weight {
          background-color: currentColor;
          mask: url(/icons/weight.svg) no-repeat center;
          mask-size: contain;
        }

        &.plus {
          background-color: currentColor;
          mask: url(/icons/plus.svg) no-repeat center;
          mask-size: contain;
        }

        &.settings {
          background-color: currentColor;
          mask: url(/icons/settings.svg) no-repeat center;
          mask-size: contain;
        }

        &.more {
          background-color: currentColor;
          mask: url(/icons/more.svg) no-repeat center;
          mask-size: contain;
        }
      }
    }
  }
`;
export default StyledMenu;
