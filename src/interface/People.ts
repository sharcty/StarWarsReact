import { Film } from "./Film";
import { Starship } from "./Starship";

export interface People {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: Film[];
    species: string[];
    starships: Starship[];
    vehicles: string[];
    url: string;
    created: string;
    edited: string;
}