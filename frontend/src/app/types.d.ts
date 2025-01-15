export interface Album {
    _id: string;
    title: string;
    releaseDate: number;
    coverImage?: string | null;
}

export interface Artist {
    _id: string;
    name: string;
    photo?: string | null;
}

export interface Track {
    _id: string;
    title: string;
    trackNumber: number;
    length: string;
}