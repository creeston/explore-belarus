export interface FilterSpecification {
    regions: string[];
    ratings: number[];

    excludeVisited: boolean;
    excludePlanned: boolean;
}