import styled from "styled-components";
import { ClsBtn, HomeBtn, ModBtn } from "./Buttons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentHeightAtom, isDarkAtom } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const MacWindowWrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  /* border: 3px solid ${(props) => props.theme.bgColor}; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 0px;
  margin: auto;
  width: 80%;
  min-height: 500px; // 최소 높이 설정
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // 내용이 위에서부터 시작하도록 변경
  /* 자연스러운 애니메이션 */
  max-height: 500px;
  overflow: hidden;
  transition: max-height 0.3s ease;

  button {
    height: 26px;
    width: 26px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const StateBar = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: none;
  /* border-bottom: 2px solid ${(props) => props.theme.textColor}; */
  border-radius: 10px 10px 0 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: start;
  align-items: center;
`;

const BtnCont = styled.div`
  width: 100px;
  height: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function MacWindowBar() {
  const toggleDark = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const nav = useNavigate();
  const contentHeight = useRecoilValue(contentHeightAtom);
  const setContentHeight = useSetRecoilState(contentHeightAtom);

  const onToggle = () => (toggleDark((prev) => !prev));
  const goBack = () => {nav(-1);};
  const goHome = () => {nav("/");};
  const onResize = () => {
    const newHeight = window.innerHeight - 100;
    setContentHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <StateBar>
      <BtnCont>
        <ClsBtn onClick={goBack}></ClsBtn>
        <ModBtn onClick={onToggle} isDark={isDark}></ModBtn>
        <HomeBtn onClick={goHome}></HomeBtn>
      </BtnCont>
    </StateBar>
  );
}
