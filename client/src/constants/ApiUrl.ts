import process from 'process';

const ApiIp = process.env.API_URL || "localhost";
const ApiPort = "8100";
export const ApiUrl = `${ApiIp}:${ApiPort}`;

export const ApiUrlLogin = `${ApiUrl}/auth`;
export const ApiUrlRefresh = `${ApiUrl}/auth/refresh`;
export const ApiUrlRegister = `${ApiUrl}/users`;

export const ApiUrlGetUser = `${ApiUrl}/users/`;
export const ApiUrlGetLeaderboard = `${ApiUrl}/leaderboard`;

export const ApiUrlGetRooms = `${ApiUrl}/rooms/all`;
export const ApiUrlCreateRoom = `${ApiUrl}/rooms`;
export const ApiUrlAccessRoom = `${ApiUrl}/rooms/join`;

export const ApiUrlGetUserGameHistories = `${ApiUrl}/gameHistories/`;
