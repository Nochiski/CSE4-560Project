import { useEffect, useState } from 'react'
import '../CSS/Statistic.css'
import { ModelItem } from '../Model/statItem';
import { getContry_data } from '../Data/nationcode';
import axios from 'axios';
import { getSports } from '../Data/sports';

export function Statistic(){
    const [row, setRow] = useState([]);
    const [country_data, setCountry_data] = useState(getContry_data());
    const [sport_data, setSport_data] = useState(getSports());

    /*These are for filter */
    const [statData, setStatData] = useState([]);
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("all")
    const [searchSeason, setSearchSeasons] = useState("all");
    const [gender, setGender] = useState("all");
    const [height, setHeight] = useState({
      comp: 'all',
      value: ''
    });
    const [weight, setWeight] = useState({
      comp: 'all',
      value: ''
    });
    const [sport, setSport] = useState("all");

    useEffect(()=>{
        setRow(statData);
        
    },[statData])
    const handleSearchButton = () => {
        if (name === '') {
          //alert('Please enter the name')
        }
        const data = {
          name: name,
          nationality: nationality === 'all' ? null : nationality,
          searchSeason: searchSeason === 'all' ? null : searchSeason,
          gender: gender === 'all' ? null : gender,
          height: height.comp === 'all' || height.value === null ? null : {comp:height.comp, value:height.value},
          weight: weight.comp === 'all' || weight.value === null ? null : {comp:weight.comp, value:weight.value},
          sport: sport === 'all' ? null : sport
        };
        console.log(data)
    
        axios.get('http://localhost:8080/search', {params:data})
        .then(response => {
          console.log(response.data);
          const players = [];
          response.data.map((item) => {
            players.push(new ModelItem(item.full_name,
              item.gold_medals, 
              item.silver_medals,
              item.bronze_medals,
              item.gender,
              item.height,
              item.weight,
              item.region_name,
              item.sport_name))
          })
          setStatData(players);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    
      }
    
      const handleSelectChange = (event, id) => {
        switch (id){
          case "nation":
            setNationality(event.target.value);
            break;
    
          case "gender":
            setGender(event.target.value);
            break;
    
          case "heightcomp":
            if(height){
              setHeight({
                comp: event.target.value,
                value: height.value
              });  
            }else{
              setHeight({
                comp: event.target.value,
                value: null
              })
            }
            break;
    
          case "weightcomp":
            if(weight){
              setWeight({
                comp: event.target.value,
                value: weight.value
              });  
            }else{
              setWeight({
                comp: event.target.value,
                value: null
              })
            }
            break;
    
          case "name":
            setName(event.target.value);
            break;
          
          case "height":
            if(height){
              setHeight({
                comp: height.comp,
                value: event.target.value 
              });  
            }else{
              setHeight({
                comp: 'all',
                value: event.target.value
              })
            }
            break;
          
          case "weight":
            if(weight){
              setWeight({
                comp: weight.comp,
                value: event.target.value
              });  
            }else{
              setWeight({
                comp: 'all',
                value: event.target.value
              })
            }
            break;

          case "sport":
            setSport(event.target.value);
            break;
    
        }
      };
    
      const handleReset = (id) => {
        if(id ==='weight'){
          setWeight({
            comp: 'all',
            value: ''
          })
        }else if(id ==='height'){
          setHeight({
            comp: 'all',
            value: ''
          })
        }
      }

    return(      
        <div>
            <div className='search_bar'>
            <div className='search_bar_top'>
            <label id='name' className='label'>Name</label>
            <input type="text"
            className='search_name'
            id='name'
            placeholder='Search name 🔍'
            onChange={(e)=>handleSelectChange(e, "name")}
            >

            </input>
            <button onClick={handleSearchButton}>
                Search
            </button>
            </div>

            <div className='search_bar_bottom'>
            <div >
                <label id='nation' className='label'>Nationality</label>
                <select name="nation" id="nation" className='dropdown' onChange={(e)=>handleSelectChange(e, "nation")}>
                {country_data.map((item, index)=>{
                    return <option key={index} value={item}>{item}</option>
                })}
                </select>
            </div>

            <div>
                <label id='gender' className='label'>Gender</label>
                <select name="gender" id="gender" className='dropdown' onChange={(e)=>handleSelectChange(e, "gender")}>
                <option key={0} value="all">all</option>
                <option key={1} value="male">male</option>
                <option key={2} value="female">female</option>
                </select>
            </div>

            <div>
                <select name="weight" id="weight" className='dropdown' value={weight.comp} onChange={(e)=>handleSelectChange(e, "weightcomp")}>
                <option key={0} value="all">all</option>
                <option key={1} value="equal">=</option>
                <option key={2} value="more">{'>'}</option>
                <option key={3} value="less">{'<'}</option>
                </select>
                <input 
                type="number" 
                className='textInput'
                placeholder='weight(kg)'
                value={weight.value}
                onChange={(e)=>handleSelectChange(e, "weight")}/>
                <button
                onClick={()=>handleReset("weight")}>
                reset
                </button>
            </div>

            <div>
                <select name="height" id="height" className='dropdown' value={height.comp} onChange={(e)=>handleSelectChange(e, "heightcomp")}>
                <option key={0} value="all">all</option>
                <option key={1} value="equal">=</option>
                <option key={2} value="more">{'>'}</option>
                <option key={3} value="less">{'<'}</option>
                </select>
                <input type="number" 
                className='textInput'
                placeholder='height(cm)'
                value={height.value}
                onChange={(e)=>handleSelectChange(e, "height")}/>
                <button
                onClick={()=>handleReset("height")}>
                reset
                </button>  
            </div>
            <div >
                <label id='sport' className='label'>Sport</label>
                <select name="sport" id="sport" className='dropdown' onChange={(e)=>handleSelectChange(e, "sport")}>
                {sport_data.map((item, index)=>{
                    return <option key={index} value={item}>{item}</option>
                })}
                </select>
            </div>

            </div>
        </div>

        <div className="stat_background">
            <div className="stat_header">
                <b className='stat_header_name'>Name</b>
                <b className='stat_header_item'>🥇</b>
                <b className='stat_header_item'>🥈</b>
                <b className='stat_header_item'>🥉</b>
                <b className='stat_header_item'>Gender</b>
                <b className='stat_header_item'>Height(cm)</b>
                <b className='stat_header_item'>Weight(kg)</b>
                <b className='stat_header_item'>Nationality</b>
                <b className='stat_header_name'>Sports</b>
            </div>
            <div className='stat_body'>
                {
                    row.map((item, index)=>(
                        <div className='stat_row' key={index}>
                            <p className='row_name'>{item.name}</p>
                            <p className='row_column'>{item.gold}</p>
                            <p className='row_column'>{item.sliver}</p>
                            <p className='row_column'>{item.bronze}</p>
                            <p className='row_column'>{item.gender}</p>
                            <p className='row_column'>{item.height}</p>
                            <p className='row_column'>{item.weight}</p>
                            <p className='row_column'>{item.nationality}</p>
                            <p className='row_name'>{item.sport}</p>
                        </div>
                    ))
                }

            </div>
        </div>
        </div>
    )
}