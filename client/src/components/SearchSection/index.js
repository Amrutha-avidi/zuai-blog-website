import React from 'react'
import './index.css'

const SearchSection = ({ searchInput, setSearchInput }) => {
  return (
    
      <input 
        type='search' 
        className='search-bar'
        value={searchInput} 
        onChange={e => setSearchInput(e.target.value)} 
        placeholder="Search for blogs..." 
      />
  
  )
}

export default SearchSection
