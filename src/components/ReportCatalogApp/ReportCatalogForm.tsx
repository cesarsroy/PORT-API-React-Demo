import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import styles from './ReportCatalogBox.module.css'
import getReportCatalog, { CatalogFormData, InformationObject} from '../../services/reportCatalog';
import { Axios, AxiosError } from 'axios';


const ReportCatalogForm = ({accessToken} : {accessToken: string}) => {
    
    const {register, formState, handleSubmit} = useForm<CatalogFormData>();
    const [catalogResponse, setCatalogResponse] = useState<InformationObject[]>([]);
    const [catalogError, setCatalogError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const onError = (err: AxiosError) => {
        setCatalogError(JSON.stringify(err?.response?.data || {}))
    }
    const onCatalogSumbit = (data: CatalogFormData)=> {
        setCatalogError('')
        setCatalogResponse([])
        
        setIsLoading(true)
        console.log('The FORM has the following data')
        console.log(data)
        console.log('The FORM state is')
        console.log(formState)
        async function executeSubmit() {
                const _catalogResponse = await getReportCatalog(data,
                accessToken,
                onError
                )
            setCatalogResponse([..._catalogResponse])
            setIsLoading(false)
            

        }
        executeSubmit();
        
            
    };
    
  return (
    <div className="h4 text-secondary mt-3 pt-2 border-top border-secondary">
        Report Catalog Example
        <p className="fst-italic fw-normal h6 pt-2">Use the report catalog to see what reports are available.</p>
        <form onSubmit={handleSubmit(onCatalogSumbit)}>
                <div className="input-group m-2">
                    <span className={`input-group-text ${styles.wideInputText}`}> Portfolio</span>
                    <input {...register('portfolio')} className="form-control" type="text" placeholder="Portfolio to filter the report catalog by."></input>

                </div>
                <div className="input-group m-2">
                    <span className={`input-group-text ${styles.wideInputText}`}> Currency</span>
                    <input {...register('currency')} className="form-control" type="text" placeholder="Currency to filter the report catalog by."></input>

                </div>
                <div className="input-group m-2">
                    <span className={`input-group-text ${styles.wideInputText}`}> Benchmark</span>
                    <input {...register('benchmark')}className="form-control" type="text" placeholder="Benchmark to filter the report catalog by."></input>

                </div>
                <div className="input-group m-2">
                    <span className={`input-group-text ${styles.wideInputText}`}> Report Name</span>
                    <input {...register('reportName')} className="form-control" type="text" placeholder="Report Name to filter the report catalog by."></input>

                </div>
                <div className="d-flex">
                <button 
                    className={`btn btn-outline-primary m-2 w-50 ${accessToken ? "" : "disabled"}`} 
                    type="submit"
                    disabled={!accessToken || isLoading}
                
                >Get Report Catalog</button>
                {isLoading && <div className={`spinner-border m-auto ${styles.spinner}`}></div>}
                


                </div>
                

        </form>
        {catalogError !== '' && 
        <div className="alert alert-danger fw-light fs-5">{catalogError}</div>
        }
        {catalogResponse.length > 0 && 
        <div className={`table-responsive ${styles.tableHeight}`}>
            <table className="text-secondary table table-striped table-white fw-normal table-bordered border-secondary">
            <thead className="bg-secondary text-white">
                {['Report Name','Portfolio','Benchmark','Currency'].map(
                    (key)=> {
                        return <th className='fw-light fs-5 bg-secondary text-white'>{key}</th>
                    }
                )}
            </thead>
            <tbody>
            {
                catalogResponse.map((el: InformationObject, i : number) => {
                    return (<tr className='fw-light fs-6 '>
                        <td className='table-hover'>{el.reportName}</td>
                        <td>{el.portfolio}</td>
                        <td>{el.benchmark}</td>
                        <td>{el.currency}</td>

                    </tr>)
                })
            }

            </tbody>
            


        </table>

        </div>
        
            
        }

    </div>
    
  )
}

export default ReportCatalogForm