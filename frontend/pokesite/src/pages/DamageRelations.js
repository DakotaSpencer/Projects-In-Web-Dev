/* eslint-disable react/jsx-no-target-blank */
import React, {useState} from 'react';
import './damageRelationsChart.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import DefaultTC from '../components/TypeCharts/DefaultTC';
import TypeChartComponent from '../components/TypeCharts/TypeChartComponent';

const DamageRelations = () => {
    document.title = "Damage Relations - PocketDex"
    const [typeChart, setTypeChart] = useState("Default");

    const handleTypeSelect=(e)=>{
        setTypeChart(e)
        console.log(typeChart)
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div style={{textAlign:"center"}}>
            <h1>Damage Relations</h1>
            <div>
                <label>Select a Type Chart</label>
                <DropdownButton
                    onSelect={handleTypeSelect}
                    variant={"secondary"}
                    title={capitalizeFirstLetter(typeChart)}
                    className="mt-2"
                    data-bs-theme="dark"
                >
                    <Dropdown.Item eventKey={"Default"} className={`pokemonMoveType `} active>
                    Default
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <h5 className={`pokemonMoveType `}>Dual Types</h5>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey={"normal"} className={`pokemonMoveType normal`}>Normal</Dropdown.Item>
                    <Dropdown.Item eventKey={"fire"} className='pokemonMoveType fire'>Fire</Dropdown.Item>
                    <Dropdown.Item eventKey={"water"} className={`pokemonMoveType water`}>Water</Dropdown.Item>
                    <Dropdown.Item eventKey={"electric"} className={`pokemonMoveType electric`}>Electric</Dropdown.Item>
                    <Dropdown.Item eventKey={"grass"} className={`pokemonMoveType grass`}>Grass</Dropdown.Item>
                    <Dropdown.Item eventKey={"ice"} className={`pokemonMoveType ice`}>Ice</Dropdown.Item>
                    <Dropdown.Item eventKey={"fighting"} className={`pokemonMoveType fighting`}>Fighting</Dropdown.Item>
                    <Dropdown.Item eventKey={"poison"} className={`pokemonMoveType poison`}>Poison</Dropdown.Item>
                    <Dropdown.Item eventKey={"ground"} className={`pokemonMoveType ground`}>Ground</Dropdown.Item>
                    <Dropdown.Item eventKey={"flying"} className={`pokemonMoveType flying`}>Flying</Dropdown.Item>
                    <Dropdown.Item eventKey={"psychic"} className={`pokemonMoveType psychic`}>Psychic</Dropdown.Item>
                    <Dropdown.Item eventKey={"bug"} className={`pokemonMoveType bug`}>Bug</Dropdown.Item>
                    <Dropdown.Item eventKey={"rock"} className={`pokemonMoveType rock`}>Rock</Dropdown.Item>
                    <Dropdown.Item eventKey={"ghost"} className={`pokemonMoveType ghost`}>Ghost</Dropdown.Item>
                    <Dropdown.Item eventKey={"dragon"} className={`pokemonMoveType dragon`}>Dragon</Dropdown.Item>
                    <Dropdown.Item eventKey={"dark"} className={`pokemonMoveType dark`}>Dark</Dropdown.Item>
                    <Dropdown.Item eventKey={"steel"} className={`pokemonMoveType steel`}>Steel</Dropdown.Item>
                    <Dropdown.Item eventKey={"fairy"} className={`pokemonMoveType fairy`}>Fairy</Dropdown.Item>
                </DropdownButton>
                
            </div>
            <div className='howToUse'>
                <h3>
                    How to use these charts:
                </h3><p>For the default chart, look down the left hand side to find the attacking type, then move across to see how effective it is against each type!</p>
                <p>For Dual Type charts, look across the top to find the attacking type, then move down to see how effective it is against each type!</p>
                
            </div>
            <h3>Key:</h3>
            <div style={{padding:"2%",display:"flex", justifyContent: "space-evenly", flexDirection:"row"}}>
                <div><div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}><div style={{padding:"1%"}} className='perfectSquare double'><p className='centeredText'>x2</p></div><div style={{padding:"1%"}} className='perfectSquare double'><p className='centeredText'>x4</p></div></div> Super Effective (Double / Quadruple DMG)</div>
                <div><div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}><div style={{padding:"1%"}} className='perfectSquare normaldmg'><p className='centeredText'>x1</p></div></div> Normal (Normal Damage)</div>
                <div><div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}><div style={{padding:"1%"}} className='perfectSquare half'><p className='centeredText'>x0.5</p></div><div style={{padding:"1%"}} className='perfectSquare quarter'><p className='centeredText'>x0.25</p></div></div> Not Very Effective (50% Damage / 25% Damage)</div>
                <div><div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}><div style={{padding:"1%"}} className='perfectSquare none'><p className='centeredText'>x0</p></div></div> No Effect (No Damage)</div>
            </div>
            <div className='typeChart' style={{padding:"2%"}}>
                {
                    typeChart.toLowerCase()==="default"?<DefaultTC/>:
                    <TypeChartComponent type={typeChart}/>
                }
                
            </div>
        </div>
    );
};

export default DamageRelations;
