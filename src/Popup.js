import React from 'react';
import ReactDOM from 'react-dom';

function Popup ({winner, restart}) {

    return ReactDOM.createPortal(
      <>
        {
          winner === "Draw" ?
          <div className="popup-background">
            <div className="popup"
              style={{background: "purple"}}>
              <span> 🕺🏼 </span>
              <p>{winner}</p>

              <audio controls
                 style={{ display: "none "}}
                 src="DiscoInferno.mp3"
                 type="audio/mpeg" autoPlay>
              </audio>

              <button onClick={() => restart()}>Play Again</button>
            </div>
          </div>
          :
          <div className="popup-background">
            <div className="popup"
              style={{background: winner}}>
              <span> 🕺🏼 </span>
              <p>This Color Won</p>

                <audio
                   style={{ display: "none "}}
                   controls
                   src="DiscoInferno.mp3"
                   type="audio/mpeg" autoPlay>
                 </audio>

              <button onClick={() => restart()}>Play Again</button>
            </div>
          </div>
        }
      </>
      ,
      document.querySelector("body")
    )
}
export default Popup;
