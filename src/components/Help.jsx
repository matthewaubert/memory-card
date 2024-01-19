import { useState } from 'react';
import '../styles/modal.css';

export default function Help({ numGames }) {
  // initially display Help modal only if it's the first game
  const [displayHelp, setDisplayHelp] = useState(numGames === 0);

  function closeModal(e) {
    if (e.target === e.currentTarget) setDisplayHelp(false);
  }

  return (
    <>
      <button className="footer-btn" onClick={() => setDisplayHelp(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>help</title>
          <path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
        </svg>
      </button>
      {displayHelp && (
        <div className="overlay" onClick={closeModal}>
          <div className="help-menu modal">
            <h2>How to Play</h2>
            <p>
              The goal of this memory card game is to click on as many cards as
              possible without repeating any selections.
            </p>
            <p>See how good your memory is based on your score!</p>
            <button className="modal-btn" onClick={closeModal}>
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
