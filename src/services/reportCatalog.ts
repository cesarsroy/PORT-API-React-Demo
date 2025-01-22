import axios, { Axios, AxiosError } from 'axios'

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


async function getReportCatalog(body: CatalogFormData , 
                            accessToken: string | null,
                            onError: (err: AxiosError)=>void
                        ):Promise<InformationObject[]> {
    
    if (accessToken == null) {
        throw new Error('You need an access token.')
    }
    const catalogPath = 'https://api.bloomberg.com/enterprise/portfolio/report/info'

    for (const [key, item] of Object.entries(body)) {

        if (item == '') {
            console.debug(`Removing key ${key} from catalog body`)
            delete body[key]
        }
    }

    const headers = {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + accessToken
    };

    console.info('GET Request sent with this body and headers')
    console.info(body)
    console.info(headers)
    let catalogResponse: InformationObject[] = []
    try {
        const rawResponse = await axios.get<CatalogResponseObject>(catalogPath,
            { headers ,
                params: body
            });
            
        console.debug(rawResponse)
        catalogResponse = rawResponse?.data?.reportInformation
        console.info('Report information:')
        console.info(catalogResponse)

        } catch (error) {
            console.error('Error getting the report catalog.')
            console.error(error)
            if (error instanceof AxiosError) {
                onError(error)

            }

        }

    return catalogResponse


}


export default getReportCatalog