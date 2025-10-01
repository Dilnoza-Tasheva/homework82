export interface Artist {
    _id: string;
    name: string;
    photo?: string | null;
    information?: string;
}

export type ArtistWihtoutId = Omit<Artist, '_id'>

export interface Album {
    _id: string;
    title: string;
    artist: string;
    releaseDate: number;
    coverImage?: string | null;
}

export interface Track {
    _id: string;
    title: string;
    album: string;
    length: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: 'admin' | 'user';
}

export interface TrackHistory {
    user: string;
    track: string;
    dateTime: string;
}