import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterInfo } from "../Services/characterService";
import { IonLoading,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
function CharactersDetail() {
  const { id } = useParams();

  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await getCharacterInfo(id);
        setCharacter(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    request();
  }, [id]);

  if (loading) {
    return <IonLoading message="Loading..."  spinner="circles" />;
  } else {
    return (
      <div className="character-detail">
        <IonCard>
          <img src={character.sprites.front_default} />
          <IonCardHeader>
            <IonCardTitle>{character.name}</IonCardTitle>
            <IonCardSubtitle>Experiencia: {character.base_experience} XP</IonCardSubtitle>
            <IonCardSubtitle>Altura: {character.height} cm</IonCardSubtitle>
            <IonCardSubtitle>Peso: {character.weight} kg</IonCardSubtitle>
            <IonCardSubtitle>Habilidad: {character.abilities[0].ability.name}</IonCardSubtitle>

          </IonCardHeader>

        </IonCard>
      </div>
    );
  }
}

export default CharactersDetail;
