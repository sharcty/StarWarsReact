import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Results } from '../../interface/Results';
import Cards from './Cards';

//* Mock data
const mockData: Results = {
    results: [
        {
            birth_year: "19BBY",
            created: "2014-12-09T13:50:51.644000Z",
            edited: "2014-12-20T21:17:56.891000Z",
            eye_color: "blue",
            films: [],
            gender: "male",
            hair_color: "blond",
            height: "172",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "77",
            name: "Luke Skywalker",
            skin_color: "fair",
            species: [],
            starships: [],
            url: "https://swapi.dev/api/people/1/",
            vehicles: []
        },
        {

            birth_year: "112BBY",
            created: "2014-12-10T15:10:51.357000Z",
            edited: "2014-12-20T21:17:50.309000Z",
            eye_color: "yellow",
            films: [],
            gender: "n/a",
            hair_color: "n/a",
            height: "167",
            homeworld: "https://swapi.dev/api/planets/1/",
            mass: "75",
            name: "C-3PO",
            skin_color: "gold",
            species: [],
            starships: [],
            url: "https://swapi.dev/api/people/2/",
            vehicles: []
        },
    ],
    count: 0,
    next: '',
    previous: ''
};

describe('Cards Component', () => {
    //* render element to test
    render(<Cards data={mockData} onCardClick={() => { }} />);

    it('renders character cards when data is provided', () => {
        expect(screen.findByText(/Luke Skywalker/i)).toBeDefined();
        expect(screen.findByText(/C-3PO/i)).toBeDefined();
    });

    it('displays character details correctly', () => {
        expect(screen.findByText(/Hair Color: blond/i)).toBeDefined();
        expect(screen.findByText(/Birth Year: 19BBY/i)).toBeDefined();
        expect(screen.findByText(/Eye Color: blue/i)).toBeDefined();
    });

    it('renders character images with correct src and alt attributes', () => {
        const images = screen.getAllByRole('img');
        expect(images[0]).toHaveProperty('src', 'https://starwars-visualguide.com/assets/img/characters/1.jpg');
        expect(images[0]).toHaveProperty('alt', 'Luke Skywalker');
    });
});

