import { IonSearchbar } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">
      <IonSearchbar></IonSearchbar>
    </div>
  );
};

export default ExploreContainer;
