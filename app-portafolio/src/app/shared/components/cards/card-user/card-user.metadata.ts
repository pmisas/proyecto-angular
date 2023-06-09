export type Licencias = 'USER' | 'ADMIN'

export interface ICardUser {
    map(arg0: (i: any) => void): unknown;
    id: number,
    avatar: string;
    name: string;
    gender: string;
    age: number;
    description: string;
    id_Proyect?: number; //opcional
    is_Admin: boolean;
    info: string
}