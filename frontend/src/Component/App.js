import { useEffect, useState } from 'react';
import '../CSS/App.css';
import { getSeasons } from '../Data/seasons';
import { Statistic } from './Statistic';

const selected = {
  Player : "Player",
  AddPlayer : "Add Player"
};

function App() {
  const [selectedItem, setSelectedItem] = useState(selected.Player);




  useEffect(()=>{
  
  })
  
  const handleClick = (selected) => {
    setSelectedItem(selected)
  }

  return (
    <div className="App">
      <div className='class_tab'>
        <button className='tab_bar_button' onClick={()=>handleClick(selected.Player)}>
          {selectedItem === selected.Player ? <b>Search Player</b> : "Search Player"}
          </button>
        <button className='tab_bar_button' onClick={()=>handleClick(selected.AddPlayer)}>
        {selectedItem === selected.AddPlayer ? <b>+</b> : "+"}
        </button>
      </div>
      <div className='statistic'>
        <Statistic></Statistic>
      </div>
    </div>
  );
}

export default App;
