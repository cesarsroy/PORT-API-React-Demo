
import axios from 'axios';
const t = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJzc29DZXJ0IiwicGkuYXRtIjoieTU3OSJ9.eyJzY29wZSI6W10sImF1dGhvcml6YXRpb25fZGV0YWlscyI6W10sImNsaWVudF9pZCI6ImQ4M2RlYzhhZjQzN2RhODhlZTRmYzUzOWVlY2ZhNGEyIiwiaXNzIjoiaHR0cHM6Ly9ic3NvLmJsb29tYmVyZy5jb20iLCJhdWQiOiJicmk6d2FnIiwiaWF0IjoxNzM3NDk2Nzk0LCJleHAiOjE3Mzc1MDM5OTR9.TFus1tEF8vkzBsJ_Rah7sPe_P5D_neWnMwDeHSOTOX6T-shguOlHFb46XmDRk_WR8lDfMhFLSN9j9OAXVfoklx9MDMTvsgZee2qy64VTLNttHECyq1yCLLVie_913RKFqw_DUYeS3ECWMZS86HEzUVIb0OZyAYe-V8aggJtKctF3D6-1LZZXcq9MJ3Eme5Mot68G-Ry6wJT2APqSk5OaCE1HBoE4YKWJyy8YsRhks2m0g_6McURhbkuGy4E_XSat1DW-gHbA8te_gbhRJPnHIlBY3KoGchhyQVzXOil33_hVIk7_q9H6zCq1Hghox2srPqf4Vtw8AXTTxXooI-IqzROlsJfPS70YpMhnqN9tt7J0S3pfRazQ0EQ40e6Gwt5v5fo8HdqBV9mVaRrH1VTfBoxWcCFp1MJxzpx9MCtPhLycXXi2V4yix202bplrPd8ooqXXKrH-FuJOPJLhpHtXVCE63uQtsvRXrtzoHXWeNP-0vV0Je86lIcqkFuyEsKPxpq4E2097PIZu3dEuCeaKSz2Y9IWOrMpFp5JjPndAkik5GJiZcuEuuW2tXl1GXlRhSnoYk0CAqDfollKvo6KMEhSsR9Do4ghOsaB8_vmdVKq3Rauj9G-A1cPOuoZGDi7WXTRCmqBHXMY85UwRi_59DZTZNR8_KkYRIA2FInE12Yw'

async function get_report_catalog(body, 
                            accessToken
                        ) {
    
    if (accessToken == null) {
        throw new Error('You need an access token.')
    }
    const catalogPath = 'https://api.bloomberg.com/enterprise/portfolio/report/info'

    for (const key in body) {

        if (body[key] == '') {
            console.debug(`Removing key ${key} from catalog body`)
            delete body[key]
        }
    }

        const headers = {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + accessToken
        };

        console.info('GET Request sent with this params and headers')
        console.info(requestParams)
        console.info(headers)
        let catalogResponse = {}
        await axios.get(catalogPath,
            { headers ,
                params: body
            }

            ).then(({data}) => {
                console.log(`Report Catalog response:`)
                console.log(data)
                catalogResponse = data

            }).catch(err => {
                console.log('Error occurred')
                console.log(err)
        })

        return catalogResponse


}

get_report_catalog({portfolio:'POPAPI_CASH'},t)