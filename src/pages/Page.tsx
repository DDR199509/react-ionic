import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { useState } from 'react';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [lables, setLables] = useState([{
    name: '楓葉島',
    enName: 'MapleIsland'
  },
  {
    name: '天空之城',
    enName: 'CastleInTheSky'
  },
  {
    name: '冰原雪域',
    enName: 'IcefieldSnow'
  },
  {
    name: '玩具城',
    enName: 'ToyTown'
  },
  {
    name: '地球防衛總部',
    enName: 'EarthDefenseHeadquarters'
  },
  {
    name: '台北101',
    enName: 'Taipei101'
  }
  ]);
  const tt = lables.filter((d) => d.enName === name);
  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>{tt[0].name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
