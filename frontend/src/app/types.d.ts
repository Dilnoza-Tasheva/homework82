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

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}