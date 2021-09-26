import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal,
        ActivityIndicator } from 'react-native'

import { LinearGradient, linearGradient } from 'expo-linear-gradient';
import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink';

import { Feather } from '@expo/vector-icons';
import { ContainerLogo, Logo, ContainerContent, Title, SubTitle,
ContainerInput, BoxIcon, Input, ButtonLink, ButtonLinkText } from './style';


import api from '../../services/api';
import { saveLink } from '../../util/storageLinks';


export default function Home(){

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});

  async function handleShortLink(){
    setLoading(true);
    try{
      const response = await api.post('shorten',
      {
        long_url: input
      })

      setData(response.data);
      setModalVisible(true);

      saveLink('links', response.data);

      Keyboard.dismiss();
      setLoading(false);
      setInput('');
    }catch{
      alert('Ops! Parece que algo deu errado.');
      Keyboard.dismiss();
      setInput('');
      setLoading(false);
    }
    //setModalVisible(true);
  }

  return(
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()} >
      <LinearGradient
        
        colors={['#1ddbb9', '#0B2C49']}
        style={{flex: 1, justifyContent: 'center'}}
      >

      <StatusBarPage 
        barStyle="light-content"
        backgroundColor="#0B2C49"       
      />

      <Menu/>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'position' }
        enabled
      >
        <ContainerLogo>
          <Logo source={require('../../assets/Logo.png')} resiszeMode="contain" />
        </ContainerLogo>

        <ContainerContent>
          <Title>Shorten Link</Title>
          <SubTitle>Cole seu link para encurtar</SubTitle>

          <ContainerInput>
            <BoxIcon>
              <Feather name="link" size={22} color="#FFF"/>        
            </BoxIcon>
            <Input
                placeholder="Cole seu link aqui..."
                placeholderTextColor="#FFF"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"

                value={input}
                onChangeText={ (text) => setInput(text) }
            />      
          </ContainerInput>
          <ButtonLink onPress={ handleShortLink }>
            {
              loading ? (
                <ActivityIndicator color="#121212" size={24} />
              ) : (
                <ButtonLinkText>Gerar Link</ButtonLinkText>
              )
            }
            
          </ButtonLink>

        </ContainerContent>

      </KeyboardAvoidingView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalLink onClose={ () => setModalVisible(false) } data={data}/>
      </Modal>

      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}
