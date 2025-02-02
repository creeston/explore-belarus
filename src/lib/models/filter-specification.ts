export interface FilterSpecification {
    regions: string[];

    excludeVisited: boolean;
    excludePlanned: boolean;
    excludeIgnored: boolean;
}