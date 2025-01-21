import axios from 'axios'

export interface CatalogFormData{
    portfolio: string,
    currency: string,
    benchmark: string
    reportName: string
    }


async function get_report_catalog(body: CatalogFormData , 
                            accessToken: string
                        ) {
    const catalogPath = 'https://api.bloomberg.com/enterprise/portfolio/report/info'

    const requestParams: string = new URLSearchParams({...body}).toString();

        const headers = {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + accessToken
        };

        console.info('GET Request sent with this data and headers')
        console.info(requestParams)
        console.info(headers)
        const catalogResponse = await axios.get(catalogPath,
            { headers ,
                params : requestParams
            }

            ).then((data) => {
                console.log(`Report Catalog response:`)
                console.log(data)

            }).catch(err => {
                console.log('Error occurred')
                console.log(err)
        })

        return catalogResponse


}


export default get_report_catalog