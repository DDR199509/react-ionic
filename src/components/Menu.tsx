import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle
} from '@ionic/react';
import './Menu.css';
import { useState } from 'react'; 

const Menu: React.FC = () => {
  const [lables, setLables] = useState([{
    name: '楓葉島',
    url: '/folder/MapleIsland'
  },
  {
    name: '天空之城',
    url: '/folder/CastleInTheSky'
  },
  {
    name: '冰原雪域',
    url: '/folder/IcefieldSnow'
  },
  {
    name: '玩具城',
    url: '/folder/ToyTown'
  },
  {
    name: '地球防衛總部',
    url: '/folder/EarthDefenseHeadquarters'
  },
  {
    name: '台北101',
    url: '/folder/Taipei101'
  }
  ]);
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonItem>
              <IonTitle>目錄</IonTitle>
            </IonItem>
          </IonListHeader>
          {lables.map((label, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem routerLink={label.url} routerDirection="none" lines="none" detail={false}>
                <IonLabel>{label.name}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
