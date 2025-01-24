import axios from 'axios'

export interface ReportFormData{
    reportInformation: {
        portfolio: string,
        reportName: string
    }

    }


async function getReportData(body: ReportFormData , 
                            accessToken: string | null
                        ) {
    
    if (accessToken == null) {
        throw new Error('You need an access token.')
    }
    const dataPath = 'https://api.bloomberg.com/enterprise/portfolio/report/data'

    const data: string = JSON.stringify(body)

    const headers = {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + accessToken
    };

    console.info('GET Request sent with this data and headers')
    console.info(data)
    console.info(headers)
    const dataResponse = await axios.post(dataPath,
        { headers ,
            body,
            
        }

        ).then((res) => {
            console.log(`response:`)
            console.log(res)

        }).catch(err => {
            console.log('Error occurred')
            console.log(err)
    })
    console.log('promised fulfilled')
    return dataResponse


}


export default getReportData