import '../styling/card.css';

const ArtistCard = ({artist, action}) => {
    const image = artist.images[0].url;
    const name = cleanName(artist.name);
    const followers = 'Followers: ' + artist.followers.total;
    
    return (  
        <div className="individual-card" onClick={action}>
            <img className='card-image' src={image} alt="artist image"/>
            <div className="name-label">{name}</div>

            <div className="second-label-container">
                <div className="second-label">{followers}</div>
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
 
export default ArtistCard;