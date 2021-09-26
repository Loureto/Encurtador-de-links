import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #0B2C49;
  ;
`;

export const Title = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 35+'%' : 20+'%'};
  margin-left: 20px;
  color: #FFF;
  font-size: 30px;
`;

export const ListLinks = styled.FlatList`

`;

export const ContainerEmpty = styled.View`
  margin-top: 15%;
  align-items: center;
`;

export const WarningText = styled.Text`
  font-size: 18px;
  color: #FFF;
`;