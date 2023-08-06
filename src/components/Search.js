import { useState } from "react";
import '../styling/header-buttons.css';
import All from './All';
import Albums from './Albums.js';
import Tracks from './Tracks.js';
import Artists from './Artists.js';
import Playlists from "./Playlists";
import WikiPage from "./WikiPage";

const Search = ({ data, value, token }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState('All');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    const handleButtonClick = (type) => {
        if(type === 'All'){
            setSelectedType('All');
        } else if(type === 'Albums'){
            setSelectedType('Albums');
        }
        else if(type === 'Tracks'){
            setSelectedType('Tracks');
        }
        else if(type === 'Artists'){
            setSelectedType('Artists');
        } else {
            setSelectedType('Playlists');
        }
    }
    
    return (  
        <div>
            {!selectedItem && 
            <div className="search-results-container">
                <div className="header-buttons-container">
                    <button 
                        className={`header-button ${selectedType === 'All' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('All')}>
                        All
                    </button>
                    <button 
                        className={`header-button ${selectedType === 'Albums' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Albums')}>
                        Albums
                    </button>
                    <button 
                        className={`header-button ${selectedType === 'Tracks' ? 'selected' : ''}`} 
                        onClick={() => handleButtonClick('Tracks')}>
                        Tracks
                    </button>
                    <button 
                        className={`header-button ${selectedType === 'Artists' ? 'selected' : ''}`} 
                        onClick={() => handleButtonClick('Artists')}>
                        Artists
                    </button>
                    <button 
                        className={`header-button ${selectedType === 'Playlists' ? 'selected' : ''}`} 
                        onClick={() => handleButtonClick('Playlists')}>
                        Playlists
                    </button>
                </div>
                {selectedType === 'All' && data &&
                    <All handleItemClick={handleItemClick} data={data}/>}
                {selectedType === 'Albums' && 
                    <Albums handleItemClick={handleItemClick} value={value} token={token}/>}
                {selectedType === 'Tracks' && 
                    <Tracks handleItemClick={handleItemClick} value={value} token={token}/>}
                {selectedType === 'Artists' && 
                    <Artists handleItemClick={handleItemClick} value={value} token={token}/>}
                {selectedType === 'Playlists' && 
                    <Playlists handleItemClick={handleItemClick} value={value} token={token}/>}
            </div>}
            {selectedItem && <WikiPage data={selectedItem} token={token} handleItemClick={handleItemClick}/>}

        </div>
    );
}
 
export default Search;