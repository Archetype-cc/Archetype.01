import styled from 'styled-components';

const Flex1 = styled.div `
  flex : 1;
`;

const ThemeBox = styled.button `
  flex : 1;
  width: 100%;
  float: left;
  margin-bottom: 35px;
  max-height: 300px;
  color: white;
  background-color: #0B0D0B;
  padding: 0;
  border: none;

  &:hover {
      cursor: pointer;
  }
`;


export { Flex1, ThemeBox };
