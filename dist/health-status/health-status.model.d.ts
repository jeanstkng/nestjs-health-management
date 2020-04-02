export interface HealthStatus {
    fever: boolean;
    cough: boolean;
    shortnessOfBreath: boolean;
    gender: HealthStatusGenres;
}
export declare enum HealthStatusGenres {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
