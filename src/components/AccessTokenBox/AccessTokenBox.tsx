import {useEffect, useState} from 'react'
import ServerModeClient from '../../services/oauth';
import styles from './AccessTokenBox.module.css'
import { serverClientSecret, serverclientId } from '../../constants';

const AccessTokenBox = ({onGettingToken} : {onGettingToken:(x:string)=>void}) => {

    useEffect(
        ()=>{
            if (tokenStatus === TokenStatus.Existed ){
                onGettingToken(originalToken || "")
            }

        }
        ,[])
    enum TokenStatus {Undefined, Existed, Failed, Success}
    const originalToken = sessionStorage.getItem('accessToken')

    const [alertVisible, setAlertVisible] = useState(true);
    const [tokenStatus, setTokenStatus] = useState(originalToken ? 
                                                TokenStatus.Existed
                                                :
                                                TokenStatus.Undefined);
    
    const client = new ServerModeClient(serverclientId,serverClientSecret);

    const handleClick = async () =>{
        console.log("Starting to get server access token");
        const accessToken = await client.getAccessToken();
        
        if (accessToken) { 
            sessionStorage.setItem('accessToken',accessToken)
            setTokenStatus(TokenStatus.Success)
            onGettingToken(accessToken)
        }
        else {
            setTokenStatus(TokenStatus.Failed)
        };
        setAlertVisible(true);
        
    }

    function switchMessage(tokenStatus: TokenStatus) {
        const timeoutId = setTimeout(() => setAlertVisible(false),2000);
        const fadeStylelogic = alertVisible ? "" :  [styles.alertHidden,styles.alertRemoved].join(" ")
            switch (tokenStatus) {
                    case TokenStatus.Existed :
                        return <div className={`mt-2 alert alert-primary ${fadeStylelogic}`}>Access Token retrieved from storage</div>
                    case TokenStatus.Undefined :
                        clearTimeout(timeoutId);
                            return <div className="mt-2 alert position-relative alert-warning alert-dismissable show fade" role="alert">
                                Request Access Token Before Continuing
                                    <button type="button" className="btn-close position-absolute end-0 me-4" data-bs-dismiss="alert" aria-label="Close"></button>
                            
                            </div>
                    case TokenStatus.Success:
                        return <div className={`mt-2 alert alert-success ${fadeStylelogic}`}>Access Token Retrieved Successfully and saved in Local Storage</div>
            
                    case TokenStatus.Failed:
                        clearTimeout(timeoutId);
                        return <div className={`mt-2 alert alert-danger ${fadeStylelogic}`}>Error retrieving token</div>
                    };
    }

    return (
        <>
            <p className="text-secondary fs-6 fst-italic"> PORT API Requires a token in the Authorization Headers. Click the button to get it.</p>
            <button onClick={handleClick}
                className="btn btn-outline-success"
                >Get Server Mode Access Token
            </button>
            {switchMessage(tokenStatus)}

        </>
    )

};

export default AccessTokenBox