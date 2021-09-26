import AsyncStorage from '@react-native-async-storage/async-storage';

//BUSCAR LINK
export async function getLinkSave(key){
  const mylinks = await AsyncStorage.getItem(key);

  let linkSaves = JSON.parse(mylinks) || [];

  return linkSaves;
}

//SALVAR LINK
export async function saveLink(key, newLink){
  let linkStoraged = await getLinkSave(key);

  //VERIFICAR LINK DUPLICADO

  const hasLink = linkStoraged.some(Link => Link.id === newLink.id);

  if(hasLink){
    console.log('Esse link já está salvo!');
    return;
  }

  linkStoraged.push(newLink);
  await AsyncStorage.setItem(key, JSON.stringify(linkStoraged));
  console.log('link salvo!!');
}

//DELETAR LINK
export async function deleteLink(links, id){
  let myLink = links.filter( (item) => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('links', JSON.stringify(myLink));
  console.log('link deletado da lista');
  return myLink;
}