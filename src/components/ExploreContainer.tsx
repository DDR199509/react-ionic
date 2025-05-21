import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonItem, IonList, IonSearchbar } from '@ionic/react';
import './ExploreContainer.css';
import { useState } from 'react';
import { AllMonsters } from '../monster/AllMonsters';

interface ContainerProps {
  name: keyof typeof AllMonsters;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const monster  = AllMonsters[name];
  const [cards, setCards] = useState(monster); // 顯示用資料
  const [search, setSearch] = useState(monster); // 原始資料

  // 搜尋功能
  const handleInput = (event: CustomEvent) => {
    const query = (event.target as HTMLIonSearchbarElement).value?.toLowerCase() || '';

    const filtered = search.filter((d) => {
      const content = `
        ${d.name} ${d.lv} ${d.hp} ${d.mp} ${d.exp} ${d.price}
        ${d.sundries} ${d.reel} ${d.allProfessions}
        ${d.swordsman} ${d.rogue} ${d.archer} ${d.mage} ${d.pirate}
      `.toLowerCase();
      return content.includes(query);
    });

    setCards(filtered);
  };

  return (
    <>
      <IonSearchbar debounce={300} onIonInput={handleInput} />
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        {cards.map((d, i) => (
          <IonCard
            key={i}
            style={{
              flex: "1 1 300px", // 最小300px，自動撐大
              maxWidth: "500px", // 最大不超過500px
            }}
          >
            <img
              alt="Silhouette of mountains"
              src={d.url}
              style={{ display: "block", margin: "auto", maxWidth: "100%" }}
            />
            <IonCardHeader>
              <IonCardTitle>{d.name}</IonCardTitle>
              <IonCardSubtitle>
                <div style={{ color: "red" }}>
                  LV:{d.lv} HP:{d.hp} MP:{d.mp} EXP:{d.exp} 金錢:{d.price}
                </div>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>雜物:{d.sundries}</IonItem>
                <IonItem>卷軸:{d.reel}</IonItem>
                <IonItem>全職業:{d.allProfessions}</IonItem>
                <IonItem>劍士:{d.swordsman}</IonItem>
                <IonItem>盜賊:{d.rogue}</IonItem>
                <IonItem>弓箭手:{d.archer}</IonItem>
                <IonItem>法師:{d.mage}</IonItem>
                <IonItem>海盜:{d.pirate}</IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}
      </div>

    </>
  );
};

export default ExploreContainer;
