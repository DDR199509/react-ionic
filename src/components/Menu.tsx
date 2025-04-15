import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonNote,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonInput,
  IonAlert,

} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useRef, useState } from 'react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
const Menu: React.FC = () => {
  //create newLable
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [lables, setLables] = useState([{
    name: 'Family',
    url: '/folder/Family'
  },
  {
    name: 'Friends',
    url: '/folder/Friends'
  }]);
  //confirm按鈕確認回傳質給onWillDismiss
  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }
  //新增
  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      const newLabels = {name:event.detail.data, url:`/folder/${event.detail.data}`};
      setLables(prev => [...prev,newLabels]);
    }
  }
  //刪除
  function deleteLabel(name: string) {
    
    setLables(prev => prev.filter(label => label.name !== name));
  }
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {lables.map((label, index) => (
            <IonItem className={location.pathname === label.url ? 'selected' : ''} key={index} routerLink={label.url} routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label.name}</IonLabel>
              <IonIcon aria-hidden="true" slot="end" icon={trashSharp} id={label.name}/>
              <IonAlert
                trigger={label.name}
                subHeader={`Delete ${label.name}`}
                buttons={[{
                  text: 'Cancel',
                  role: 'cancel',
                },{
                  text: 'Delete',
                  role: 'confirm',
                  handler: () => {
                    deleteLabel(label.name);
                  }
                }]}/>
              </IonItem>
          ))}
          <IonButton id='open-modal' expand="block">新增群組</IonButton>
          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(event) => onWillDismiss(event)}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonInput
                  label="Enter your lable name"
                  labelPlacement="stacked"
                  ref={input}
                  type="text"
                  placeholder="Your lable name"
                />
              </IonItem>
            </IonContent>
          </IonModal>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
