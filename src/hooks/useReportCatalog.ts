import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import getReportCatalog, { CatalogFormData, InformationObject } from '../services/reportCatalog'
import { AxiosRequestConfig } from 'axios';

interface Query {
    catalogBody: CatalogFormData;
    isEnabled: boolean;
    token: string;
    axiosOptions?: AxiosRequestConfig
}

export const serializeBody = (body: CatalogFormData)=>{
    const arr = []

    if (Object.entries(body).length === 0) return [""]
    else {
        for (const k of ["portfolio","currency","benchmark","reportName"]) {
            arr.push(body[k] || "")
        }
        return arr
    }}

const useReportCatalog = ({catalogBody,
                        token ,
                        isEnabled,
                    axiosOptions
                    }: Query

                    ) => {

    const queryFunction = ()=>{
        if (token === "") {
            console.debug('Not querying data without token')
            return []
        }
        if (Object.entries(catalogBody).length === 0) {
            console.debug('Not querying data without body. Body below')
            console.debug(catalogBody)
            return []

        }
        return getReportCatalog({body: catalogBody, token, axiosOptions})
    }


  return useQuery<InformationObject[],Error, InformationObject[]>(
    {
        queryKey: ["reportCatalog",...serializeBody(catalogBody)],
        queryFn: queryFunction,
        retry: false,
        staleTime: 1000 * 60 * 60,  // 1h
        enabled: isEnabled
    }
  )
}


export default useReportCatalog