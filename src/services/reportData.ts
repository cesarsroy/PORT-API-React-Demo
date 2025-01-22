import axios from 'axios'

export interface ReportFormData{
    portfolio: string,
    reportName: string
    }


async function get_report_data(body: ReportFormData , 
                            accessToken: string | null
                        ) {
    
    if (accessToken == null) {
        throw new Error('You need an access token.')
    }
    const catalogPath = 'https://api.bloomberg.com/enterprise/portfolio/report/data'

    for (const key in body) {

        if (body[key] == '') {
            console.debug(`Removing key ${key} from catalog body`)
            delete body[key]
        }
    }
    const data: string = JSON.stringify(body)

    const headers = {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + accessToken
    };

    console.info('GET Request sent with this data and headers')
    console.info(data)
    console.info(headers)
    const dataResponse = await axios.post(catalogPath,
        { headers ,
            data
        }

        ).then((data) => {
            console.log(`Report Catalog response:`)
            console.log(data)

        }).catch(err => {
            console.log('Error occurred')
            console.log(err)
    })

        return dataResponse


}


export default get_report_catalog