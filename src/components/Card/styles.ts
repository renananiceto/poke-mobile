// Libs
import styled, { css } from "styled-components/native";

const shadow = css`
  elevation: 4;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

export const WrapperCard = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffffff;

  ${shadow}
`;

export const Text = styled.Text`
  width: 100%;
  text-align: right;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = styled.Text``;
