import { useState } from 'react';

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Créer un employé</button>
      
      
    </div>
  );
};

export default Test;
