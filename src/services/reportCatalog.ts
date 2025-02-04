import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export interface CatalogFormData {
    [key: string]: string,
    portfolio: string,
    currency: string,
    benchmark: string
    reportName: string
    }

export interface InformationObject extends CatalogFormData {}

interface CatalogResponseObject {
    requestId: string,
    reportInformation: InformationObject[]
}

export interface GetCatalogDataArgs {
    body: CatalogFormData;
    token: string | null;
    onError?: (err: AxiosError)=>void;
    axiosOptions?:AxiosRequestConfig;
}

const getReportCatalog = async ({body, 
                token,
                axiosOptions}: GetCatalogDataArgs
        )=> {
    console.debug('Starting to get report info')
    if (token == null || body == null) {
        throw new Error('You need an access token.')
    }
    const catalogPath = 'https://api.bloomberg.com/enterprise/portfolio/report/info'

    for (const [key, item] of Object.entries(body)) {

        if (item == '') {
            delete body[key]
        }
    }

    const headers = {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + token
    };

    console.debug('GET Request sent with this body and headers')
    console.debug(body)
    console.debug(headers)
    return await axios.get<CatalogResponseObject>(catalogPath,
        { headers ,
            params: body,
            ...axiosOptions
        }).then(res => {
            console.log('Catalog response data object')
            console.log(res.data)
            return res?.data?.reportInformation})
    
}

export default getReportCatalog;