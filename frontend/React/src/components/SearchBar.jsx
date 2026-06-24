import React from 'react'

const SearchBar = ({search,setSearch}) => {
  return (
    <div>
      <input
  type="text"
  className="form-control mb-4"
  placeholder="🔍 Search Todo..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
    </div>
  )
}

export default SearchBar
