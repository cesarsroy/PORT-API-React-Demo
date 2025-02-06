import { useQuery } from '@tanstack/react-query'
import getReportdata, { ReportDataBody } from '../services/reportData'
import { AxiosRequestConfig } from 'axios';
import ReportDataForm from '../components/ReportData/ReportDataForm';

interface Query {
    reportDataForm: ReportDataForm;
    isEnabled: boolean;
    token: string;
    axiosOptions?: AxiosRequestConfig
}

export const serializeBody = (body: ReportDataForm)=>{
    const arr = []

    if (Object.entries(body).length === 0) return [""]
    else {
        for (const k of ["portfolio","reportName","date"]) {
            arr.push(body[k] || "")
        }
        return arr
    }}

const useReportData = ({reportDataForm,
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
        if (Object.entries(reportDataForm).length === 0) {
            console.debug('Not querying data without body. Body below')
            console.debug(reportDataForm)
            return []

        }

        const reportDataBody : ReportDataBody = {
            reportInformation: {
                portfolio: reportDataForm?.portfolio,
                reportName: reportDataForm?.reportName,

            }
        }
        if (reportDataForm?.date) reportDataBody.date = [reportDataForm.date]

        return getReportdata({body: reportDataBody, token, axiosOptions})
    }


  return useQuery<Object[],Error>(
    {
        queryKey: ["reportData",...serializeBody(reportDataForm)],
        queryFn: queryFunction,
        retry: false,
        staleTime: 1000 * 60 * 60,  // 1h
        enabled: isEnabled
    }
  )
}


export default useReportData