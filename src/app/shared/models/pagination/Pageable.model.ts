export class Pageable<T> {
    content: T;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
}