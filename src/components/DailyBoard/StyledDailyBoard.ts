import styled from "styled-components";

interface Props {
  lines: number;
  currentCal: number;
  needCal: number;
}

function getCssLines(
  lines: Props["lines"],
  currentCal: Props["currentCal"],
  needCal: Props["needCal"],
  emptyLineColor: string,
  currentLineColor: string,
): string {
  let elements = "";
  const start = 70;
  const end = 290;
  const step = (end - start) / lines;
  const current = currentCal / (needCal / lines);

  for (let i = 0; i < lines; i += 1) {
    let properties = "";

    properties += `transform: ${`rotate(${
      start + i * step
    }deg) translate(-50%, -50%)`}`;

    elements += `&:nth-of-type(${i}) {${properties}}`;

    if (!needCal) {
      elements += `&:nth-of-type(${i})::after {background-color: ${emptyLineColor}; width: 1px; border-radius: 0}`;
    }

    if (i > current && needCal) {
      elements += `&:nth-of-type(${i})::after {background-color: ${emptyLineColor}; width: 1px; border-radius: 0}`;
    }

    if (i === current && needCal) {
      elements += `&:nth-of-type(${i})::after {background-color: ${currentLineColor};
        width: 7px;
        border-radius: 15px;
        height: calc(24px * 1.7);
        left: 5px;
        transform: translate(-100%,-80%);}`;
    }
  }

  return elements;
}

const StyledDailyBoard = styled.section<Props>`
  display: grid;
  grid-template-rows: max-content 1fr;

  & .board {
    display: grid;
    padding-bottom: 5rem;

    .date {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr max-content;

      & .date-header {
        text-align: center;

        & h1 {
          margin-top: 1rem;
          display: inline-block;
          cursor: pointer;
        }
      }

      & .date-body {
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-rows: 1fr;

        //TODO create icons component
        & .arrow-icon {
          color: ${(props) => props.theme.colorSecondary};
          align-self: end;
          height: 100%;
          width: 2.5rem;
          cursor: pointer;

          &:first-of-type {
            margin-left: 1rem;
            justify-self: start;
            transform: rotate(180deg);
          }
          &:last-of-type {
            margin-right: 1rem;
            justify-self: end;
          }

          & > i.arrow {
            display: block;
            height: 100%;
            width: 100%;
            background-color: currentColor;
            mask: url(/icons/arrow.svg) no-repeat center;
            mask-size: contain;
          }
        }

        & .text {
          align-self: end;
          justify-self: center;
          font-size: 2rem;
          color: ${(props) => props.theme.colorTertiary};
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }

    .circle-box {
      justify-self: center;
      position: relative;
      width: 300px;
      height: 300px;
      margin-top: 5rem;

      & .line {
        position: absolute;
        width: 2px;
        height: 100%;
        top: 50%;
        left: 50%;
        transform-origin: top left;

        &::after {
          display: block;
          position: absolute;
          content: "";
          background-color: ${(props) => props.theme.colorSecondary};
          height: 24px;
          width: 3px;
          top: 100%;
          left: 3px;
          border-radius: 40% 40% 0 0;
          transform: translate(-100%, -100%);
        }

        ${(props) =>
          getCssLines(
            props.lines,
            props.currentCal,
            props.needCal,
            props.theme.colorTertiary,
            props.theme.colorGreen,
          )};
      }

      & .total {
        &-cal {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          line-height: normal;

          & .loader {
            margin-top: 2rem;
          }

          & span {
            display: block;
          }

          & .current {
            color: ${(props) => props.theme.colorPrimary};
            font-size: 7rem;
          }

          & .need {
            color: ${(props) => props.theme.colorTertiary};
            font-size: 3rem;
            white-space: nowrap;
          }
        }
      }
    }

    .cal-table {
      margin-top: -7rem;
      display: grid;
      grid-auto-flow: column;
      justify-content: center;
      justify-self: stretch;
      column-gap: 5rem;

      & .item {
        width: 11rem;
        text-align: center;

        & span {
          display: block;
          //line-height: normal;
          line-height: 1.4;
        }

        & .weight {
          color: ${(props) => props.theme.colorPrimary};
          font-size: 4rem;

          & small {
            font-size: 60%;
          }
        }

        & .name {
          color: ${(props) => props.theme.colorTertiary};
          font-size: 2.1rem;
        }
      }

      & .loader {
        & .lds-grid {
          width: 4rem;
          height: 4rem;
          transform: scale(0.5) translateX(-50%);
        }
      }
    }
  }

  & .products {
    display: grid;
    align-content: baseline;
    background-color: ${(props) => props.theme.colorGray};
    padding: 0 2rem;

    & .empty {
      text-align: center;
      margin-top: 3rem;
    }

    & .loader {
      margin: 3rem auto 0;
    }
  }

  & .modal-form {
    max-width: 37rem;
    margin: 3rem auto 0;
  }
`;

export default StyledDailyBoard;
