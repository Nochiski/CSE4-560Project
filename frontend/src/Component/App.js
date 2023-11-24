import { useState } from 'react';
import '../CSS/App.css';

const selected = {
  Player : "Player",
  Country : "Country",
  Game : "Game"
}
function App() {
  const [selectedItem, setSelectedItem] = useState(selected.Player);

  const handleClick = (selected) => {
    setSelectedItem(selected)
  }

  return (
    <div className="App">
      <div className='class_tab'>
        <button className='tab_bar_button' onClick={()=>handleClick(selected.Player)}>
          {selectedItem === selected.Player ? <b>Player</b> : "Player"}
          </button>
        <button className='tab_bar_button' onClick={()=>handleClick(selected.Country)}>
        {selectedItem === selected.Country ? <b>Country</b> : "Country"}
        </button>
        <button className='tab_bar_button' onClick={()=>handleClick(selected.Game)}>
        {selectedItem === selected.Game ? <b>Game</b> : "Game"}
        </button>
      </div>
      <div className='search_bar'>
        <div className='search_bar_top'>
          
          <form>
            <input type="text"></input>
          </form>
          <button>
            Search
          </button>
        </div>
        <div>

        </div>
      </div>
      <div className='statistic'>

      </div>
    </div>
  );
}

export default App;
