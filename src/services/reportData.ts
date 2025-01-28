import axios from 'axios'

export interface ReportFormData{
    reportInformation: {
        portfolio: string,
        reportName: string
    }

    }

function parseMultiPartData(responseString:string) {
    const regex = /\{.*\}/g; 
    const matches = responseString.match(regex) || []; 
    return matches

}

interface DataColumn {
    [key: string]: any;
    name: string;
    type: string;
    doubles:number[];
    dates: Date[];
    strings:string[];
}

function toDataRecords(dataColumns:DataColumn[] ) {
    // transforms the report data response into list of records
    let i = 0
    const firstColArray = dataColumns[0][dataColumns[0].type + 's']
    const dataLength = firstColArray.length
    const records = new Array()
    while (i < dataLength) {
        const record =  {} as {[key:string]:any}
        for (const col of dataColumns) {
            record[col.name] = col[col.type +'s'][i]
        }
        records.push(record)
        i++
        
    }
    return records

}

async function getReportData(body: ReportFormData , 
                            accessToken: string | null
                        ) {
    
    if (!accessToken) {
        throw new Error('You need an access token.')
    }
    const dataPath = 'https://api.bloomberg.com/enterprise/portfolio/report/data'

    const headers = {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + accessToken
    };

    console.info('GET Request sent with this data and headers')
    console.info(body)
    console.info(headers)
    const dataResponse = await axios.post(dataPath,
        body,
        {headers}

        ).then((res) => {
            console.log(`Raw report data response:`)
            console.log(res)
            const jsonStrings = parseMultiPartData(res.data)
            const records = jsonStrings.map(s=> toDataRecords(JSON.parse(s).dataColumns))
            const allRecords = records.reduce((acc, arr) => acc.concat(arr),[])
            return allRecords

        }).catch(err => {
            console.log('Error occurred')
            console.log(err)
    })
    console.log('promised fulfilled')
    return dataResponse


}


export default getReportData