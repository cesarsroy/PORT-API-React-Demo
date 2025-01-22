import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import styles from './ReportCatalogBox.module.css'
import getReportCatalog, { CatalogFormData, InformationObject} from '../../services/reportCatalog';
import { Axios, AxiosError } from 'axios';


const ReportCatalogForm = ({accessToken} : {accessToken: string}) => {
    
    const {register, formState, handleSubmit} = useForm<CatalogFormData>();
    const [catalogResponse, setCatalogResponse] = useState<InformationObject[]>([]);
    const [catalogError, setCatalogError] = useState('');

    const onError = (err: AxiosError) => {
        setCatalogError(err.message)
    }
    const onCatalogSumbit = (data: CatalogFormData)=> {
        setCatalogError('')
            console.log('The FORM has the following data')
            console.log(data)
            console.log('The FORM state is')
            console.log(formState)
            async function executeSubmit() {
                 const _catalogResponse = await getReportCatalog(data,
                    accessToken,
                    onError
                    )
                setCatalogResponse(_catalogResponse)
                

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
                <button 
                    className={`btn btn-outline-primary m-2 w-50 ${accessToken ? "" : "disabled"}`} 
                    type="submit"
                    disabled={!accessToken}
                
                >Get Report Catalog</button>

        </form>
        {catalogError !== '' && 
        <div className="alert alert-danger">{catalogError}</div>
        }
        {catalogResponse &&
            catalogResponse.map((el: InformationObject) => {
                console.log(el)
                return <p>HI</p>
            })
        }

    </div>
    
  )
}

export default ReportCatalogForm