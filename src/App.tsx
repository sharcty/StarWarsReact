import { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Pagination from './components/Pagination/Pagination';
import Cards from './components/Cards/Cards';
import CharacterGraph from './components/CharacterGraph/CharacterGraph';

Modal.setAppElement('#root');

function App() {
  const [data, setData] = useState({ count: 0, next: "", previous: "", results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacterUrl, setSelectedCharacterUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //* Fetch data when the current page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const openModal = (characterUrl: string) => {
    setSelectedCharacterUrl(characterUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacterUrl(null);
  };

  const renderModal = () => {
    return <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Hero Graph Modal"
      className="hero-modal"
      overlayClassName="hero-modal-overlay"
    >
      <button onClick={closeModal} className="close-modal-button">
        Close
      </button>
      {selectedCharacterUrl && <CharacterGraph characterUrl={selectedCharacterUrl} />}
    </Modal>;
  }

  return (
    <>
      <Pagination
        postsPerPage={10}
        totalPosts={data.count || 0}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
      <Cards data={data} onCardClick={openModal}></Cards>
      {renderModal()}
    </>
  );
}

export default App;