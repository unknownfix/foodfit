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

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }

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
