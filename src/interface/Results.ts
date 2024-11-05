import { People } from "./People";

export interface Results {
    count: number;
    next: string;
    previous: string;
    results: People[]
}
