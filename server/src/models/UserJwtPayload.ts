export class UserJwtPayload {
    public id: number;
    public username: string;

    constructor(id : number, username : string) {
        this.id = id;
        this.username = username;
    }
}
