export interface HealthStatus {
    id: string;
    fever: boolean;
    cough: boolean;
    shortnessOfBreath: boolean;
    gender: HealthStatusGenres;
}

export enum HealthStatusGenres {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}
