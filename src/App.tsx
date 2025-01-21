import { useState } from 'react'
import AccessTokenBox from './components/AccessTokenBox'
import ReportCatalogForm from './components/ReportCatalogApp/ReportCatalogForm'
// https://raybo.org/slides_bootstrap5/#/
function App() {
  

  return (
  <>
    <div className="container position-relative mt-5 mb-5">
      <h3 className="h1"> PORT API Javascript Demo</h3>
      <AccessTokenBox/>
      <ReportCatalogForm/>
    </div>
  </>
  )
}

export default App
