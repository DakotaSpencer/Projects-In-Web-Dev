import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchTerm] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        setSearchQuery(searchTerm.get("query"))
    },[searchQuery, searchTerm])
    
    return (
        <div>Search: searched for: {searchQuery}</div>
    )
}

export default Search