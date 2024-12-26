export interface CreateRoomInputDTO {
  name: string;
  isPrivate: boolean;
}

export interface JoinRoomInputDTO {
  uuid: string;
}

export interface ListRoomItemOutputDTO {
  uuid: string;
  name: string;
}