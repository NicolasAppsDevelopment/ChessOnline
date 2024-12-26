export interface CreateRoom {
  name: string,
  isPrivate: boolean,
}

export interface ListRoomItem {
  uuid: string,
  name: string,
}

export interface JoinRoom {
  uuid: string,
}
