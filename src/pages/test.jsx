import { useState } from 'react';
import Modal from 'hrnet-plugin-modal-aw';

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Créer un employé</button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={toggleModal} 
      />
    </div>
  );
};

export default Test;
