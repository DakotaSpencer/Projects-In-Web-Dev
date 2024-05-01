/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import './damageRelationsChart.scss'

const DamageRelations = () => {
    const [typeArray, setTypeArray] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
            const tempArray = [];
            for (let i = 1; i <= 18; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
                const data = await response.json();
                tempArray.push(data);
            }
            setTypeArray(tempArray);
        };
        fetchData();
    }, [])

  return (
    <div>
        <div>
        <h3>Damage Relations</h3>
        </div>
        <div className='typeChart'>
            <table>
                    <thead>
                        <th>Type</th>
                        <th>Takes 2x Damage From</th>
                        <th>Does 2x Damage To</th>
                        <th>Takes 1/2 Damage From</th>
                        <th>Does 1/2 Damage To</th>
                        <th>Takes No Damage From</th>
                        <th>Does No Damage To</th>
                    </thead>
                    {
                        typeArray?.map(type => (
                            <tr >
                                <td className={`pokemonMoveType ${type?.name}`}>{type?.name}</td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.double_damage_from.length>0?type?.damage_relations.double_damage_from.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.double_damage_to.length>0?type?.damage_relations.double_damage_to.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.half_damage_from.length>0?type?.damage_relations.half_damage_from.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.half_damage_to.length>0?type?.damage_relations.half_damage_to.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.no_damage_from.length>0?type?.damage_relations.no_damage_from.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                                <td ><p style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", margin:"auto"}}>
                                    {type?.damage_relations.no_damage_to.length>0?type?.damage_relations.no_damage_to.map(type => (
                                    <p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
                                )):"—"}</p></td>
                            </tr>
                        ))
                    }
            </table>
        </div>
        
    </div>
    )
}

export default DamageRelations