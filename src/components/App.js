import Search from './Search';
import { useState, useEffect } from "react";
import '../styling/header.css';
import '../styling/search-bar.css';
import '../styling/initial-s-bar.css';

function App() {
  const [value, setValue] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  
  const [searchKey, setSearchKey] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch('http://arriagada689.github.io/music-wiki-app-react/initial')
      .then((response) => response.json())
      .then((token) => {
        setToken(token.access_token);
      })
  }, []);

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if(value.length > 0 && containsLetterOrNumber(value)){
      setSearchKey(prevKey => prevKey + 1);
      setShowResults(true);

      //fetch data for all component
      fetch(`https://api.spotify.com/v1/search?q=${value}&type=album,track,artist,playlist&limit=5`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }
  }
  
  return (
    <div className="App">
      <header className="header">Music Wiki App</header>
      {!showResults && 
      <div className="middle">
        <div className="prompt">Search for your favorite albums, tracks, artists, or playlists!</div>
        <form className='a' onSubmit={(event) => {event.preventDefault(); handleSubmit(); }}>
          <div className='b'>
            <input type='text' placeholder='' value={value} onChange={handleSearchChange} />
          </div>
          <button type='submit' className='c'>Search</button>
        </form>
      </div>}
      {showResults && 
      <div>
        <form className="search-container" onSubmit={(event) => {event.preventDefault(); handleSubmit(); }}>
          <div className='searchBar'>
            <input type='text' placeholder='Search for artists, tracks, albums, or playlists' value={value} onChange={handleSearchChange} />
          </div>
          <button type='submit' className='searchButton'>Search</button>
        </form>
        <div className='search-results'>
          <Search key={searchKey} data={data} value={value} token={token}/>
        </div>
      </div>}
      
    </div>
  );
}

function containsLetterOrNumber(str) {
  return /[a-zA-Z0-9]/.test(str);
}

export default App;
