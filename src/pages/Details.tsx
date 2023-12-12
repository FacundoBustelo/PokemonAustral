import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CharacterDetails from '../components/CharacterDetails';
import './Home.css';
import { caretBack } from 'ionicons/icons';

const Detail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Pokemones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <CharacterDetails />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
