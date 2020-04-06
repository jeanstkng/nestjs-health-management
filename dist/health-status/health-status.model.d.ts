export interface HealthStatus {
    id: string;
    fever: boolean;
    cough: boolean;
    shortnessOfBreath: boolean;
    gender: HealthStatusGender;
}
export declare enum HealthStatusGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
