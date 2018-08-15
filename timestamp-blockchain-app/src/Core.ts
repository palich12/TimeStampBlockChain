import axios from 'axios'
import * as CryptoJS from 'crypto-js';
// @ts-ignore
import * as Exonum from 'exonum-client'
import {UserInfo} from './UserInfo';

const usersData : UserInfo[] = [
    {
        login:      "user1",
        passHash:   "0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90",
        publicKey:  "95060ae736c5b9b1baa33b8548977cc61d212304848833c907b3e9651797fec1",
        secretKey:  "ed44b4303fcbe0691ad2174cba3a707825b5d47dc71d68759af62c6e7edfc45f95060ae736c5b9b1baa33b8548977cc61d212304848833c907b3e9651797fec1"
    },
    {
        login:      "user2",
        passHash:   "6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3",
        publicKey:  "c029b7524b9a9bd961d44291569965a0c8dcc53b7ac07901520ef5495fbd7701",
        secretKey:  "1b153773f189c1a2e8aa9e43e8e674f1718e530cce9cf0248a284f143f1854d8c029b7524b9a9bd961d44291569965a0c8dcc53b7ac07901520ef5495fbd7701"
    }
];

// const PER_PAGE = 10
// const ATTEMPTS = 10
// const ATTEMPT_TIMEOUT = 500
const PROTOCOL_VERSION = 0
const SERVICE_ID = 130
const TX_ID = 0


export class Core {

    public static HOST = "http://167.99.130.47:8064"; 

    public static login( login: string, pass: string ) : UserInfo | null {

        const kp = Exonum.keyPair();
        console.log(kp.publicKey);
        console.log(kp.secretKey);

        const hash = Core.getHash(pass);
        for( const user of usersData){
            if( user.login === login && user.passHash === hash ){
                window.localStorage.setItem("UserInfo", JSON.stringify(user));
                return user;
            }
        }  
        return null;
    }

    public static logout(): void{
        window.localStorage.removeItem("UserInfo");
    }

    public static getUserInfo() : UserInfo | null {
        const infostring = window.localStorage.getItem("UserInfo");
        if(infostring == null){
            return null;
        }
        else{
            return JSON.parse(infostring);
        }
    }

    public static getHash( input : any ) : string {
        const hash = CryptoJS.algo.SHA256.create();
        hash.update(CryptoJS.enc.Latin1.parse(input));
        return('' + hash.finalize());
    }

    public static async getFileHash( file : File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader;
            reader.onload = () => {
                try {
                    resolve(Core.getHash(reader.result));
                } catch (error) {
                    reject(error)
                }
            };
            reader.readAsBinaryString(file);
        });
    }

    public static async uploadFile(file:File, metadata: string){

        const user = Core.getUserInfo() as UserInfo;
        const hash = await Core.getFileHash(file);


        // Describe transaction
        const TxFile = Exonum.newMessage({
            
            fields: [
                { name: 'pub_key', type: Exonum.PublicKey },
                { name: 'metadata', type: Exonum.String },
                { name: 'file_hash', type: Exonum.Hash }
            ],
            message_id: TX_ID,
            protocol_version: PROTOCOL_VERSION,
            service_id: SERVICE_ID
        })
  
        // Transaction data
        const data = {
            pub_key: user.publicKey,
            // tslint:disable-next-line:object-literal-sort-keys
            'metadata': metadata,
            file_hash: hash
        }

        // Sign transaction
        const signature = TxFile.sign(user.secretKey, data);

        const tx = {
            body: data,
            message_id: TX_ID,
            protocol_version: PROTOCOL_VERSION,
            service_id: SERVICE_ID,
            "signature": signature,
        };
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tx", JSON.stringify(tx));
        axios.post( '/api/services/timestamping/v1/files', 
                    formData, 
                    { 
                        headers: {
                            'Content-Type': 'multipart/form-data',                          
                        }
                    })
        .then( response => {
            console.log("File uploaded!");
            console.log(response);
            let userFiles = window.localStorage.getItem("UserFiles");
            if(userFiles == null){
                userFiles = JSON.stringify([hash]);
            }
            else{
                userFiles = JSON.stringify( JSON.parse(userFiles).push(hash) );
            }
            window.localStorage.setItem("UserFiles", userFiles);

            this.redirect("/file/"+hash);
        });
    }

    public static async checkFile(hash:string): Promise<string>{
        return ( await axios.get<string>( '/api/services/timestamping/v1/timestamps/value/' + hash)).data;
    }

    public static async checkServer() : Promise<string> {
        return (await axios.get<string>( 
            '/api/services/configuration/v1/configs/actual'
        )).data;
    }

    public static redirect(path:string){
        history.pushState({},"",path); 
        window.location.reload();
    }
}