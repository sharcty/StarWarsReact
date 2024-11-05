
import { Key } from 'react';
import { People } from '../../interface/People';
import './Cards.css';
import { Results } from '../../interface/Results';

const IMG_URL = "https://starwars-visualguide.com/assets/img/characters/";

//* Process url to get propper url for image
function getCharacterImageUrl(url: string): string | undefined {
    //* Get character id from url 
    const characterId = url.split('/').filter(Boolean).pop();
    return `${IMG_URL}${characterId}.jpg`;
}

// * Card element that shows img and data about character
function Cards({ data, onCardClick }: { data: Results, onCardClick: (url: string) => void; }) {

    //* Showing user that data is loading
    if (!data || !data.results) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cards">
            {data.results?.map((character: People, index: Key) => {
                return (
                    <div
                        key={index}
                        className="card text-3xl font-bold underline"
                        onClick={() => onCardClick(character.url)}
                    >
                        <h3>{character.name}</h3>
                        <img
                            src={getCharacterImageUrl(character.url)}
                            alt={character.name}
                        />
                        <div className="description">
                            Hair Color: {character.hair_color} <br></br>
                            Birth Year: {character.birth_year} <br></br>
                            Eye Color: {character.eye_color} <br></br>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Cards;