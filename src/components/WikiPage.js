import { useEffect, useState } from 'react';
import '../styling/wiki-page.css';
import '../styling/mini-card.css';
import '../styling/search-bar.css';
import MiniCard from './MiniCard';

const WikiPage = ({data, token, handleItemClick}) => {
    const [tracks, setTracks] = useState([]);
    
    const getTracks = () => {
        fetch(data.tracks.href, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((tracks) => {
                setTracks(tracks.items);
            })
    }

    useEffect(() => {
        if(data.type === 'playlist'){
            getTracks();
        }
    }, [data]);

    const createDiv = () => {
        if(data.type === 'album'){
            const image = data.images[0].url;
            const name = data.name;
            const artist = data.artists[0].name;
            const releaseDate = data.release_date;
            const totalTracks = data.total_tracks;
            const spotifyLink = data.external_urls.spotify;
            return (
                <div className="wiki-page">
                    <img src={image} alt="album cover"/>
                    <div className="wiki-name">{name}</div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Artist: </div>
                        <div className="wiki-label">{artist}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Release date:</div>
                        <div className="wiki-label">{releaseDate}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Total tracks:</div>
                        <div className="wiki-label">{totalTracks}</div>
                    </div>
                    <a href={spotifyLink} className="spotify-link">Listen on Spotify</a>
                </div>
            );
        } else if(data.type === 'track'){
            const image = data.album.images[0].url;
            const name = data.name;
            const artist = data.artists[0].name;
            const releaseDate = data.album.release_date;
            const duration = convertMs(data.duration_ms);
            const explicit = booleanToString(data.explicit);
            const discNumber = data.disc_number;
            const trackNumber = data.track_number;
            const previewLink = data.preview_url;
            const spotifyLink = data.external_urls.spotify;
            return (
                <div className="wiki-page">
                    <img src={image} alt='track album cover'/>
                    <div className="wiki-name">{name}</div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Artist:</div>
                        <div className="wiki-label">{artist}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Release date:</div>
                        <div className="wiki-label">{releaseDate}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Duration:</div>
                        <div className="wiki-label">{duration}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Explicit language:</div>
                        <div className="wiki-label">{explicit}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Disc number:</div>
                        <div className="wiki-label">{discNumber}</div>
                    </div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Track number:</div>
                        <div className="wiki-label">{trackNumber}</div>
                    </div>
                    <a href={previewLink} className="preview-link">Preview</a>
                    <a href={spotifyLink} className="spotify-link">Listen on Spotify</a>
                </div>
            )
        } else if(data.type === 'artist'){
            const image = data.images[0].url;
            const name = data.name;
            const followers = data.followers.total;
            const genres = data.genres;
            const spotifyLink = data.external_urls.spotify;
            return (
                <div className="wiki-page">
                    <img src={image} alt='artist'/>
                    <div className="wiki-name">{name}</div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Followers:</div>
                        <div className="wiki-label">{followers}</div>
                    </div>
                    <div className="genre-label-container">
                        <div className="genre-label">Genres:</div>
                        <div className="verticalize">
                            {genres.map((genre, index) => {
                                return <div className="genre-item" key={index}>{genre}</div>
                            })}
                        </div>
                    </div>
                    <a href={spotifyLink} className="spotify-link">Listen on Spotify</a>
                </div>
            )
        } else if(data.type === 'playlist'){
            const image = data.images[0].url;
            const name = data.name;
            const creator = data.owner.display_name
            const creatorPageLink = data.owner.external_urls.spotify;
            const spotifyLink = data.external_urls.spotify;

            return (
                <div className="wiki-page">
                    <img src={image} alt='playlist cover'/>
                    <div className="wiki-name">{name}</div>
                    <div className="wiki-label-container">
                        <div className="wiki-label underline">Creator:</div>
                        <div className="wiki-label">{creator}</div>
                    </div>
                    <a href={creatorPageLink} className="preview-link">Visit the creator's page</a>
                    <a href={spotifyLink} className="spotify-link">Listen on Spotify</a>
                    <div className="genre-label">Tracks:</div>
                    
                    <div className="playlist-track-container">
                    {
                        tracks.length > 0 ? (
                            tracks.map((track, i) => {
                                const name = track.track.name;
                                const artist = track.track.artists[0].name;
                                const year = track.track.album.release_date.slice(0, 4);
                                return <MiniCard name={name} artist={artist} year={year} key={i}/>
                            })
                        ) : (
                            <div>No tracks available</div>
                        )
                    }
                    </div>
                </div>
            )
        }
    }

    return (  
        <div>
            <button onClick={() => handleItemClick(null)} className='searchButton add-margin-left'>Go back to results</button>
            {createDiv()}
        </div>
    );
}

function convertMs(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
}

function booleanToString(bool){
    if(bool){
        return 'true';
    } else{
        return 'none';
    }
}
 
export default WikiPage;