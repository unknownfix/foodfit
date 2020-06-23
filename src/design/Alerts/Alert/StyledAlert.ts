import styled from "styled-components";

const StyledAlert = styled.div`
  position: relative;
  margin-bottom: 3rem;
  background-color: rgb(255, 242, 240);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 204, 199);
  border-image: initial;
  color: ${(props) => props.theme.colorThirty};
  font-size: 1.4rem;
  line-height: 1.5715;
  padding: 0.8rem 1.6rem 0.8rem;

  & span {
    vertical-align: middle;
    display: inline-block;
  }

  & .icon {
    color: ${(props) => props.theme.colorRed};

    & > svg {
      position: absolute;
      top: 50%;
      left: 2rem;
      transform: translate(-50%, -50%);
    }
  }

  & .message {
    margin-left: 2.5rem;
  }
`;

export default StyledAlert;
