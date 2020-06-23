import styled from "styled-components";

export default styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 0.16em solid rgba(255,255,255, 0.3)};
  border-top: 0.16em solid #fff;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
