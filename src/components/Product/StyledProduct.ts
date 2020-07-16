import styled from "styled-components";
import { darken } from "polished";

const StyledProduct = styled.section`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-auto-columns: max-content;
  padding: 1rem 0;
  color: ${(props) => props.theme.colorTertiary};
  font-size: 1.6rem;
  border-bottom: 1px solid ${(props) => darken(0.1, props.theme.colorGray)};
  height: 6rem;

  & > span:not(:first-of-type):not(:last-of-type) {
    padding: 0 2rem;
  }

  & .nutritions {
    display: grid;
    grid-auto-flow: column;
    font-size: 1.3rem;

    & .nutrition {
      display: grid;
      margin: 0 0.5rem;
      justify-items: center;
    }
  }

  & .weight {
    justify-self: end;
    padding: 0;
  }

  & .cal {
    justify-self: end;
    width: 12rem;
    text-align: end;
  }

  & .action {
    justify-self: end;
    display: flex;
    padding-left: 3rem;
    color: #65a6f2;
    text-transform: uppercase;
    width: 10rem;
    transition: 0.5s ease-out;

    & span {
      cursor: pointer;
      // display: inline-block;
    }

    & .menu {
      &--actions {
        display: none;
        & span:not(:last-child) {
          margin-right: 2rem;
        }
      }
    }
  }

  & .action.touched {
    width: 16rem;

    & .menu {
      display: none;
      &--actions {
        display: inline-block;
      }
    }
  }
`;

export default StyledProduct;
