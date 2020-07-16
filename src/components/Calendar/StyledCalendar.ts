import styled from "styled-components";

interface Props {
  active: boolean;
}

const StyledCalendar = styled.section<Props>`
  position: absolute;
  top: 0;
  background-color: #fff;
  height: 100%;
  transition: transform 0.7s ease-out;
  transform: ${(props) => {
    return props.active ? "translateY(0%)" : "translateY(-110%)";
  }};
  box-shadow: 0px 0px 9px 0px rgba(46, 74, 117, 1);

  & h1 {
    margin-top: 1rem;
    text-align: center;
  }

  & .react-calendar {
    border: none;
    width: 100%;

    & * {
      font-family: ${(props) => props.theme.fontPrimary.join(",")};
      font-size: 2rem;
    }

    & *:enabled:hover,
    & *:enabled:focus {
      background: none;
    }

    &__navigation {
      height: 2em;

      &__label {
        font-size: 2rem;
        color: ${(props) => props.theme.colorTertiary};
        text-transform: uppercase;
      }

      &__prev-button {
        display: block;
        height: 100%;
        background-color: ${(props) => props.theme.colorSecondary};
        mask: url(/icons/arrow.svg) no-repeat center;
        mask-size: contain;
        transform: rotate(180deg);

        &:enabled:hover,
        &:enabled:focus {
          background-color: ${(props) => props.theme.colorSecondary};
        }
      }

      &__next-button {
        display: block;
        height: 100%;
        background-color: ${(props) => props.theme.colorSecondary};
        mask: url(/icons/arrow.svg) no-repeat center;
        mask-size: contain;

        &:enabled:hover,
        &:enabled:focus {
          background-color: ${(props) => props.theme.colorSecondary};
        }
      }

      &__prev2-button {
        display: none;
      }

      &__next2-button {
        display: none;
      }
    }

    &__month-view {
      &__weekdays {
        &__weekday {
          color: ${(props) => props.theme.colorTertiary};
          & abbr {
            text-decoration: none;
          }
        }
      }

      &__days {
        &__day {
          color: ${(props) => props.theme.colorPrimary};

          &--neighboringMonth {
            color: #757575;
          }
        }
      }
    }

    &__tile {
      &--now {
        color: ${(props) => props.theme.colorRed};
        background: none;
      }

      &--active {
        background: none;
        padding: 0em 0.5em;
        & abbr {
          border-radius: 50%;
          background-color: ${(props) => props.theme.colorGreen};
          width: 5rem;
          height: 5rem;
          display: inline-block;
          line-height: 5rem;
          color: #ffff;
        }
      }
    }
  }
`;

export default StyledCalendar;
