import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const SelectedPokemon = () => {
    const [queryParameters] = useSearchParams()
    const [selectedPokemon, setSelectedPokemon] = useState('');

    useEffect(() => {
        setSelectedPokemon(queryParameters.get("pokemon"))
    })
    return (
        <div>Selected Pokemon: {selectedPokemon}</div>
    )
}

export default SelectedPokemon