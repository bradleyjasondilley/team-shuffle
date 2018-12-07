export interface User {
    name: string;
    position: string;
    roles: Array<string>;
    pool: string;
    access: string;
    startdate: string;
    throughput: number;
    availability: number;
    effective: number;
}