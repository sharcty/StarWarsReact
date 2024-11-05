import { useState, useEffect } from 'react';
import { Handle, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CharacterGraph.css';
import { CardData } from '../../interface/CardData';

//* Custom node for graph
function CardNode({ data }: { data: CardData }) {
    //* Render placeholder img if no img found 
    const handleError = (event: { target: { src: string; }; }) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    return (
        <div className="card-node">
            <label>{data.value}</label>
            <img
                src={`https://starwars-visualguide.com/assets/img/${data.type}/${data.url}.jpg`}
                alt={data.value}
                onError={handleError}
            />
            <Handle type="source" position="bottom" id="source" />
            <Handle type="target" position="top" id="target" />
        </div>
    );
}

const CARD_NODE = 'cardNode';
const CHARACTER = 'character';

function CharacterGraph({ characterUrl }: { characterUrl: URL }) {
    const nodeTypes = { cardNode: CardNode };
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        //* Return if there is no URL
        if (!characterUrl) return;

        //* Function to fetch JSON data from a given URL
        const fetchJson = async (url: string | URL | Request) => fetch(url).then((res) => res.json());
        //* Function to create a node object for the graph
        const createNode = (id: string, type: string, data: { value: any; url: any; type: string; }, position: { x: number; y: number; }) => ({ id, type, data, position });
        //* Function to fetch Character details and construct the nodes and edges
        const fetchCharacterDetails = async () => {
            try {
                //* Fetch the Character data using the provided URL
                const characterData = await fetchJson(characterUrl);
                //* Create a node for the Character
                const characterNode = createNode(CHARACTER, CARD_NODE, {
                    value: characterData.name,
                    url: characterData.url.split('/').filter(Boolean).pop(),
                    type: 'characters'
                }, { x: 100, y: 0 });

                const newNodes = [characterNode];
                const newEdges = [];

                //* Fetch film data associated with the Character
                const filmsData = await Promise.all(characterData.films.map(fetchJson));
                filmsData.forEach((film, index) => {
                    //* Create a node for each film
                    const filmNode = createNode(
                        `film-${index}`,
                        CARD_NODE,
                        {
                            value: film.title,
                            url: film.url.split('/').filter(Boolean).pop(),
                            type: 'films'
                        },
                        { x: index * 200, y: 300 }
                    );
                    //* Push node and edge
                    newNodes.push(filmNode);
                    newEdges.push({
                        id: `character-film-${index}`,
                        source: CHARACTER,
                        target: `film-${index}`,
                        style: { stroke: 'var(--butterscotch)', strokeWidth: 3 }
                    });
                });

                const starshipsMap = new Map();
                const characterStarships = new Set(characterData.starships);

                //* Loop through each film to fetch its starships
                for (const [filmIndex, film] of filmsData.entries()) {
                    const filmStarships = await Promise.all(film.starships.map(fetchJson));

                    filmStarships.forEach((starship, index) => {
                        //* Check if the starship belongs to the character and isn't already mapped
                        if (characterStarships.has(starship.url) && !starshipsMap.has(starship.url)) {
                            const id = starship.url.split('/').filter(Boolean).pop();
                            //* Create a node for the starship
                            const starshipNode = createNode(
                                `starship-${index}`,
                                CARD_NODE,
                                {
                                    value: starship.name,
                                    url: id,
                                    type: 'starships'
                                },
                                { x: index * 200 - 600, y: 600 }
                            );

                            newNodes.push(starshipNode);
                            starshipsMap.set(starship.url, starshipNode.id);
                        }
                        //* Create an edge connecting the film to the starship
                        if (starshipsMap.has(starship.url)) {
                            newEdges.push({
                                id: `film-starship-${filmIndex}-${index}`,
                                source: `film-${filmIndex}`,
                                target: starshipsMap.get(starship.url),
                                style: { stroke: 'var(--orange)', strokeWidth: 3 }
                            });
                        }
                    });
                }
                //* Update the state with the newly created nodes and edges
                setNodes(newNodes);
                setEdges(newEdges);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
    }, [characterUrl]);

    return (
        <div style={{ height: '50vh', width: '100%', zIndex: '3' }}>
            <ReactFlow colorMode="dark" nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
            </ReactFlow>
        </div>
    );
}

export default CharacterGraph;

