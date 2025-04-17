import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPopover, IonSearchbar, IonTextarea, IonToolbar } from '@ionic/react';
import './ExploreContainer.css';
import { useRef, useState } from 'react';
import { add, appsOutline, appsSharp, createOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface ContainerProps {
  name: string;
}
interface Card {
  title: string;
  content: string;
  image: string[];
  link: string;
}
const exCards: Card[] = [
  {
    title: "Card 1",
    content: "This is the content of Card 1.",
    image: ["image1.jpg", "image2.jpg"],
    link: "https://example.com/card1",
  },
  {
    title: "Card 2",
    content: "This is the content of Card 2.",
    image: ["image3.jpg", "image4.jpg"],
    link: "https://example.com/card2",
  }
];

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [viewCtrl, setViewCtrl] = useState(false);
  const [cards, setCards] = useState([...exCards]);
  const [search, setSearch] = useState([...exCards]);
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const modal = useRef<HTMLIonModalElement>(null);
  const [openPopover, setOpenPopover] = useState(false);
  //create new card
  function confirm() {
    modal.current?.dismiss({ cardTitle, cardContent }, 'confirm');
  }
  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {

    if (event.detail.role === 'confirm') {
      const { cardTitle, cardContent } = event.detail.data
      const newCard: Card = { title: cardTitle, content: cardContent, image: [], link: '' };
      setSearch([...cards, newCard]);
      setCards([...cards, newCard]);
      setCardTitle('');
      setCardContent('');
    }
  }
  //search bar
  const handleInput = (event: Event) => {
    let query = '';
    const target = event.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    if (query) { setCards(cards.filter((d) => d.title.toLowerCase().indexOf(query) > -1)) } else setCards(search);

  };
  return (

    <div className='container'>
      <IonSearchbar debounce={1000} onIonInput={(event) => handleInput(event)}></IonSearchbar>
      {viewCtrl === true ?
        <IonList>
          {cards.map((card, index) => (
            <>
              <IonItem id={index.toString()}>
                <IonLabel>{card.title}</IonLabel>
              </IonItem>
              <div onMouseLeave={() => setOpenPopover(false)}>
                <IonPopover
                  className='popover'
                  isOpen={openPopover}
                  trigger={index.toString()}
                  triggerAction="hover"
                  onMouseLeave={() => setOpenPopover(false)}
                  onDidDismiss={() => setOpenPopover(false)}
                  showBackdrop={false}
                  backdropDismiss={false}>
                  <IonContent class="ion-padding">{card.content}</IonContent>
                </IonPopover>
              </div>
            </>
          ))}
        </IonList>
        : cards.map((card, index) => (
          <IonCard key={index} className='card' id={index.toString()}>
            {card.image.map((image, index) => (
              <img key={index} src={image} alt={card.title} />
            ))}
            <IonCardHeader>
              <IonCardTitle>{card.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{card.content}</IonCardContent>
            <div onMouseLeave={() => setOpenPopover(false)}>
              <IonPopover
                className='popover'
                isOpen={openPopover}
                trigger={index.toString()}
                triggerAction="hover"
                onMouseLeave={() => setOpenPopover(false)}
                onDidDismiss={() => setOpenPopover(false)}
                showBackdrop={false}
                backdropDismiss={false}>
                <IonContent class="ion-padding">{card.content}</IonContent>
              </IonPopover>
            </div>
          </IonCard>
        ))}
      <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton onClick={() => setViewCtrl(!viewCtrl)}>
            <IonIcon icon={appsSharp}></IonIcon>
          </IonFabButton>
          <IonFabButton id={`${name}Create`}>
            <IonIcon icon={createOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonModal ref={modal} trigger={`${name}Create`} onWillDismiss={(even) => onWillDismiss(even)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton strong={true} onClick={() => confirm()}>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              label='Card Title'
              labelPlacement='stacked'
              type='text'
              value={cardTitle}
              onIonChange={(e) => setCardTitle(e.detail.value!)}
              placeholder="Card Title"
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              label='Card content'
              labelPlacement='stacked'
              value={cardContent}
              onIonChange={(e) => setCardContent(e.detail.value!)}
              placeholder="Card content"
            />
          </IonItem>
        </IonContent>
      </IonModal>
    </div>




  );
};

export default ExploreContainer;
