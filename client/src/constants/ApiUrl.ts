const ApiIp = "10.8.0.2";
const ApiPort = "8100";
export const ApiUrl = `http://${ApiIp}:${ApiPort}`;


export const ApiUrlLogin = `${ApiUrl}/auth`;
export const ApiUrlRefresh = `${ApiUrl}/auth/refresh`;
export const ApiUrlRegister = `${ApiUrl}/users`;

export const ApiUrlGetRooms = `${ApiUrl}/rooms/all`;
export const ApiUrlCreateRoom = `${ApiUrl}/rooms`;
export const ApiUrlAccessRoom = `${ApiUrl}/rooms/join`;
