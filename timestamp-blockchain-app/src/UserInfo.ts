export class UserInfo{
    public login : string;
    public passHash : string;
    public publicKey: string;
    public privateKey: string;
}

export const usersData : UserInfo[] = [
    {
        login: "user1",
        passHash: "0A041B9462CAA4A31BAC3567E0B6E6FD9100787DB2AB433D96F6D178CABFCE90",
        privateKey: "",
        publicKey: ""
    },
    {
        login: "user2",
        passHash: "6025D18FE48ABD45168528F18A82E265DD98D421A7084AA09F61B341703901A3",
        privateKey: "",
        publicKey: ""
    }
];