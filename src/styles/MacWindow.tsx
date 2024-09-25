import styled from "styled-components";
import { ClsBtn, HomeBtn, ModBtn } from "./Buttons";

export const MacWindowWrapper = styled.div`
  background-color: ${(props) => props.theme.textColor};
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin: auto;
  width: 80%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    height: 30px;
    width: 30px;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }
`;

const StateBar = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: start;
  align-items: center;
`;

const BtnCont = styled.div`
  width: 125px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function MacWindowBar() {
  return (
    <StateBar>
      <BtnCont>
        <ClsBtn></ClsBtn>
        <ModBtn></ModBtn>
        <HomeBtn></HomeBtn>
      </BtnCont>
    </StateBar>
  );
}
