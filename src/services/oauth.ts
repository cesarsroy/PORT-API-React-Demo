import axios from 'axios'

export interface iClient {

    clientId: string,
    clientSecret: string,
    getAccessToken: () => void

};

interface BSSOServerModeResponse {
    data: {
        access_token: string;
        expires_in: number;

    }

}

class ServerModeClient implements iClient {
    clientId: string;
    clientSecret: string;
    SERVER_MODE_URL = 'https://bsso.blpprofessional.com/ext/api/as/token.oauth2';


    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    };

    getAccessToken() {

        const token = this.get_server_mode_token(this.clientId, this.clientSecret);
        return token
    };

    private async get_server_mode_token(clientId: string,
        clientSecret: string) {

        const request_query: string = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'

        }).toString();

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        };

        let access_token = undefined
        console.info('POST Request sent with this data and headers')
        console.info(request_query)
        console.info(headers)
        await axios.post(this.SERVER_MODE_URL,
            request_query,
            { headers }

            ).then(({ data }: BSSOServerModeResponse) => {
                console.log(`Server mode authentication response:`)
                console.log(data)
                access_token = data['access_token']
                console.log(`Access token is: ${access_token}`)

            }).catch(err => {
                console.log('Error occurred')
                console.log(err)
        })

        return access_token

    }

}

export default ServerModeClient