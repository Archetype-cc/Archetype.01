import styled from 'styled-components';

const Flex1 = styled.div `
  flex : 1;
`;

const ThemeBox = styled.button `
  flex : 1;
  border: 1px solid white;
  width: 100%;
  float: left;
  margin: 5px;
  max-height: 300px;
  color: white;
  background-color: #0B0D0B;
  padding: 0;

  &:hover {
      border: 3px solid #E58E73;
      cursor: pointer;
`;


export { Flex1, ThemeBox };
