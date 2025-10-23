// export interface UserMarker {
//     id: string;
//     title: string;
//     description: string;
//     coordinate: {
//         latitude: number;
//         longitude: number;
//     }
//     images: string[];
// }

// export interface 

// types.ts


export interface UserMarker {
    id: string;
    coordinate: {
        latitude: number;
        longitude: number;
    }
    title?: string;
    description?: string;
    images: string[];
}

export type UserImage = {
    id: number;
    uri: string;
};