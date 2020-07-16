import styled from "styled-components";

export default styled.button`
  position: relative;
  width: 100%;
  height: 3.5rem;
  font-size: 1.4rem;
  font-family: inherit;
  font-weight: 500;
  color: inherit;
  padding: 1.5rem 2rem;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all 0.3s;

  color: white;
  border: 1px solid ${(props) => props.theme.colorBlue};
  background-color: ${(props) => props.theme.colorBlue};
  padding: 0;

  &:active,
  &:focus {
    outline: none;
    transform: translateY(0px);
  }

  &:disabled {
    cursor: auto;
  }

  &:disabled:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.3;
    outline: 1px solid rgba(255, 255, 255);
  }

  &.loading {
    //border: 1px solid #18caff;
  }
`;
