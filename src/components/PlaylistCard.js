import '../styling/card.css';

const PlaylistCard = ({playlist, action}) => {
    const image = playlist.images[0].url;
    const name = cleanName(playlist.name);
    const owner = cleanOwner(playlist.owner.display_name);
    
    return (  
        <div className="individual-card" onClick={action}>
            <img className='card-image' src={image} alt="playlist image"/>
            <div className="name-label">{name}</div>

            <div className="second-label-container">
                <div className="second-label">{'By ' + owner}</div>
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

const cleanOwner = (word) => {
    if(word.length >= 15){
        return word.slice(0, 15) + '...';
    } else {
        return word;
    }
}
 
export default PlaylistCard;