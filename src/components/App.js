import Search from './Search';
import LoadingEllipses from './LoadingEllipses';
import { useState, useEffect } from "react";
import '../styling/header.css';
import '../styling/search-bar.css';
import '../styling/initial-s-bar.css';

function App() {
  const [value, setValue] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  
  const [searchKey, setSearchKey] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch('https://crimson-chivalrous-chipmunk.glitch.me/initial')
      .then((response) => response.json())
      .then((data) => {
        if(data.access_token){
          setToken(data.access_token);
        } else if(data.error) {
          setError(true);
        }
      })
      .catch((error) => {
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
      {token.length === 0 && !error && <div className='centered-container'><div className='loading place-next'>Loading<LoadingEllipses/></div></div>}
      {error && <div className='centered-container'><div className='loading'>Error fetching data. Spotify API may be down.</div></div>}
      {!showResults && token.length > 0 &&
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
