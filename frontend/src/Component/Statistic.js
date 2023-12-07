import { useEffect, useState } from 'react'
import '../CSS/Statistic.css'
import { ModelItem } from '../Model/statItem';

export function Statistic({statData}){
    const [row, setRow] = useState([]);

    useEffect(()=>{
        setRow(statData);
        
    },[statData])

    return(
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
                        </div>
                    ))
                }

            </div>
        </div>
    )
}