// Objective: Export all domain files

//entities
export * from "./entities/user.entity";
export * from "./entities/match.entity";

//errors
export * from "./errors/custom.errors";
export * from "./errors/handle.errors";

//dtos
export * from "./dtos/user/register-user.dto";
export * from "./dtos/user/login-user.dto";
export * from "./dtos/user/update-user.dto";

export * from "./dtos/match/create-match.dto";
export * from "./dtos/match/update-match.dto"