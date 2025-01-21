import axios from 'axios'
import { iClient } from './oauth';

interface BSSODeviceModePollResponse {
    data: {
        access_token: string;
        expires_in: number;

    }

}

interface BSSODeviceModeStartResponse {
    data: {user_code: string,
        device_code: string,
        interval: number,
        verification_uri_complete: string,
        verification_uri: string,
        expires_in: number}

}

class DeviceModeClient implements iClient {
    clientId: string;
    clientSecret: string;
    START_URL = 'https://bsso.blpprofessional.com/as/device_authz.oauth2';
    POLL_URL = 'https://bsso.blpprofessional.com/as/token.oauth2';

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    };

    async getAccessToken() {

        const user_auth_url = await this.getAuthenticationURL(this.clientId, this.clientSecret);
        window.open(user_auth_url, '_blank')
        console.info('Authentication URL should have opened')
        return 'token'
    };

    private async getAuthenticationURL(clientId: string,
        clientSecret: string) {

        const request_query: string = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,

        }).toString();

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'Access-Control-Allow-Origin':'*'
        };

        let url = undefined

        await axios.post(this.START_URL,
            request_query,
            { headers }

            ).then(({ data }: BSSODeviceModeStartResponse) => {
                console.log(`Server mode authentication response:`)
                console.log(data)
                url = data['verification_uri_complete']
                console.log(`Url to authenticate is: ${url}`)

            }).catch(err => {
                console.log('Error occurred when starting the authentication')
                console.log(err)
        })


        return url

    }

}

export default DeviceModeClient