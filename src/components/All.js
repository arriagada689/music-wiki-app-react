import '../styling/all-container.css';
import AlbumCard from "./AlbumCard.js";
import TrackCard from "./TrackCard.js";
import ArtistCard from "./ArtistCard.js";
import PlaylistCard from "./PlaylistCard.js";

const All = ({handleItemClick, data}) => {
    const albums = data.albums.items;
    const tracks = data.tracks.items;
    const artists = data.artists.items;
    const playlists = data.playlists.items;

    const renderAlbums = () => {
        return albums.map((album, i) => (
            album.images.length > 0 &&
            <AlbumCard 
                key={i}
                album={album}
                action={() => handleItemClick(album)}/>
        ));
    }
    const renderTracks = () => {
        return tracks.map((track, i) => (
            track.album.images.length > 0 &&
            <TrackCard 
                key={i}    
                track={track}
                action={() => handleItemClick(track)}/>
        ));
    }
    const renderArtists = () => {
        return artists.map((artist, i) => (
            artist.images.length > 0 &&
            <ArtistCard 
                key={i}
                artist={artist}
                action={() => handleItemClick(artist)}/>
        ));
    }
    const renderPlaylists = () => {
        return playlists.map((playlist, i) => (
            playlist.images.length > 0 && playlist.tracks.total <= 100 &&
            <PlaylistCard 
                key={i}
                playlist={playlist} 
                action={() => handleItemClick(playlist)}/>
        ))
    }

    return (  
        <div className="all-container">
            <div className="type-label">Albums</div>
            <div className="card-container">
                {renderAlbums()}
            </div>

            <div className="type-label">Tracks</div>
            <div className="card-container">
                {renderTracks()}
            </div>

            <div className="type-label">Artists</div>
            <div className="card-container">
                {renderArtists()}
            </div>

            <div className="type-label">Playlists</div>
            <div className="card-container">
                {renderPlaylists()}
            </div>
            
        </div>
    );
}
 
export default All;