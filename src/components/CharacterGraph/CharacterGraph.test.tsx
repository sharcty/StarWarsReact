import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CharacterGraph from './CharacterGraph';

const fetch = vi.fn();

class ResizeObserver {
    callback: any;
    constructor(callback: any) {
        this.callback = callback;
    }
    observe() { }
    unobserve() { }
    disconnect() { }
}
global.ResizeObserver = ResizeObserver;

describe('CharacterGraph Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    //* Mock data 
    const mockCharacterData = {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
        starships: ['https://swapi.dev/api/starships/12/'],
    };

    const mockFilmData = [
        {
            title: 'A New Hope',
            url: 'https://swapi.dev/api/films/1/',
            starships: ['https://swapi.dev/api/starships/12/'],
        },
        {
            title: 'The Empire Strikes Back',
            url: 'https://swapi.dev/api/films/2/',
            starships: [],
        },
    ];

    fetch.mockImplementation((url: string) => {
        if (url === 'https://swapi.dev/api/people/1/') {
            return Promise.resolve({
                json: () => Promise.resolve(mockCharacterData),
            });
        } else if (url === 'https://swapi.dev/api/films/1/') {
            return Promise.resolve({
                json: () => Promise.resolve(mockFilmData[0]),
            });
        } else if (url === 'https://swapi.dev/api/films/2/') {
            return Promise.resolve({
                json: () => Promise.resolve(mockFilmData[1]),
            });
        } else if (url === 'https://swapi.dev/api/starships/12/') {
            return Promise.resolve({
                json: () => Promise.resolve({ name: 'X-wing', url: 'https://swapi.dev/api/starships/12/' }),
            });
        }
        return Promise.reject('Not found');
    });

    it('renders succesfully', async () => {


        //* Render element for test
        render(<CharacterGraph characterUrl="https://swapi.dev/api/people/1/" />);

        await waitFor(() => {
            expect(screen.getByText('Luke Skywalker')).toBeDefined();
            expect(screen.getByText('A New Hope')).toBeDefined();
            expect(screen.getByText('X-wing')).toBeDefined();
        });
    });
});
