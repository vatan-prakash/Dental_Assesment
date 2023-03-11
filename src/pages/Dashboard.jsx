import '../App.css';
// import csvtojson from 'csvtojson';
import Papa from 'papaparse';

import { Parser } from 'json2csv';

import {useEffect, useState} from 'react'

function Dashboard() {
      const [jsonData, setJsonData] = useState([]);   

      useEffect(()=>{
        if(localStorage.getItem('StudentData')){
            setJsonData(JSON.parse(localStorage.getItem('StudentData')))
        }
      },[])

      async function handleCsvFileChange(event) {
        const csvUrl = event.target.files[0];
        const data = await fetchCsvData(csvUrl);
        setJsonData(data);
        localStorage.setItem('StudentData', JSON.stringify(data))
      }
    async function fetchCsvData(csvUrl) {
        return new Promise((resolve, reject) => {
          Papa.parse(csvUrl, {
            download: true,
            header: true,
            complete: (results) => {
              resolve(results.data);
            },
            error: (error) => {
              reject(error);
            },
          });
        });
      }
      

      async function convertJsonToCsv(jsonData) {
        const parser = new Parser();
        const csv = parser.parse(jsonData);
        return csv;
      }
      
      

      function downloadCsv(csvData) {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      async function handleDownload() {
        const csvData = await convertJsonToCsv(jsonData);
        downloadCsv(csvData);
      }
      
   return (
    <div className="App">
    <div>
      <div className='but'>
        <div>
          <h1>Students</h1>
          <p>List of all students in the database</p>
        </div>
        <div className='but1'>
            <label for="csv" className='btn2'>Import Students</label>
            <input id="csv" type="file" style={{display:'none'}} onChange={handleCsvFileChange} />
            <div className='btn3' onClick={handleDownload}>Export as CSV</div>
        </div>
      </div>
      
      <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Telephone</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
  {jsonData.length>0?(jsonData.map((item,i)=>{
    return(        
    <tr key={i}>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.tel}</td>
      <td>{item.email}</td>
    </tr>
    )
  })):null}
  </tbody>
</table>
      </div>
    </div>
  );
}

export default Dashboard;
