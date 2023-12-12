import './ExploreContainer.css';
import React from 'react';
import { useEffect,useState } from "react";
import { IonItem, IonLabel, IonList,IonButton,IonLoading, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresherContent, IonRefresher } from '@ionic/react';
import { getAllCharacters } from "../Services/characterService.js";

interface ContainerProps { 
  
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offSet, setoffSet] = useState(0);
  
  
const fetchPokemonData = async () => {
  try {
    const response = await getAllCharacters(offSet);
    const arrayCharacters=response.data.results;
    arrayCharacters.forEach(character => {
      let id=character.url.split('pokemon/');
      character.id=id[1];  
    });
    setCharacters((prevList) => [...prevList, ...arrayCharacters]);
    setoffSet(offSet + 20);
    setLoading(false);
  } catch (e) {
    console.log(e);
  }
  };
  
  useEffect(() => {
    fetchPokemonData();
  }, []);

  const resetData = async () => {
    setoffSet(0);
    setCharacters([]);
  };
  const doRefresh =  async (event) => {
    await resetData();

    fetchPokemonData();
    event.detail.complete();
  };

  const loadMoreData = (event) => {

    fetchPokemonData();
    event.target.complete();
  };

  if (loading) {
    return <IonLoading trigger="loading" message="Loading..."  spinner="circles" />;
  } else {
    return (  
      <>
        <IonRefresher slot="fixed" onIonRefresh={(e) => doRefresh(e)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList inset={true}>
        {characters.map((character) => (
        <IonItem>
          <IonLabel >{character.name}</IonLabel>
           <IonButton href={'personajes/'+character.id}>Ver detalle</IonButton>
        </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll threshold="100px" onIonInfinite={(e) => loadMoreData(e)}>
        <IonInfiniteScrollContent loadingText="Cargando más...">
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
    );
  }  
};

export default ExploreContainer;
