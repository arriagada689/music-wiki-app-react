import '../styling/card.css';

const TrackCrad = ({track, action}) => {
    const image = track.album.images[0].url;
    const name = cleanName(track.name);
    const year = track.album.release_date.slice(0, 4);
    const artist = track.artists[0].name;

    return (  
        <div className="individual-card" onClick={action}>
            <img className='card-image' src={image} alt='track' />
            <div className="name-label">{name}</div>

            <div className="second-label-container">
                <div className="second-label">{year}</div>
                <div className="second-label">{artist}</div>
            </div>
        </div>
    );
}

const cleanName = (word) => {
    if(word.length >= 18){
        return word.slice(0, 18) + '...';
    } else {
        return word;
    }
}

export default TrackCrad;