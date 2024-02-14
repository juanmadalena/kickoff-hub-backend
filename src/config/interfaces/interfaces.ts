export interface CustomError {
    message: string;
    input?: string;
}

export enum Position {
    GK = "GK",
    DF = "DF",
    MF = "MF",
    FW = "FW"
}