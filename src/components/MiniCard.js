import '../styling/mini-card.css';

const MiniCard = ({name, artist, year}) => {
    return (  
        <div className="mini-card">
            <div className="mini-card-name">{name}</div>
            <div className="mini-card-artist">{artist}</div>
            <div className="mini-card-year">{year}</div>
        </div>
    );
}
 
export default MiniCard;