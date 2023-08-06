import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import '../styling/row-card-container.css';

const Artists = ({handleItemClick, value, token}) => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist&offset=${offset}`, {
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
    }, [offset]);

    const renderCards = () => {
        if(data) {
            const artists = data.artists.items;
            return artists.map((artist, i) => (
                artist.images.length > 0 &&
                <ArtistCard 
                    key={i}
                    artist={artist}
                    action={() => handleItemClick(artist)}/>
            ));
        }
    }

    const moreResults = () => {
        setOffset(offset + 20);
    }

    const prevResults = () => {
        setOffset(offset - 20);
    }
    
    return (  
        <div>
            {data && <div className="row-card-container">
                {renderCards()}
            </div>}
            {data && data.artists.items.length === 20 &&
            <div className="page-button-container">
                {offset > 0 && <button onClick={prevResults} className="page-button">Previous Results</button>}
                <button onClick={moreResults} className="page-button">More Results</button>
            </div>}
            {data && !(data.artists.items.length === 20) &&
            <div className="page-button-container">
                {offset > 0 && <button onClick={prevResults} className="page-button">Previous Results</button>}
                <button className="no-results-button">More Results</button>
            </div>}
        </div>
    );
}
 
export default Artists;