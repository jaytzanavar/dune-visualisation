import { Suspense, useEffect, useState } from 'react'
import Chart from './Components/testPieChart';
import ClipLoader from "react-spinners/ClipLoader";

import './App.css'

function App() {
  const [queryData, setQueryData] = useState([{
    name: '',
    value: 0,
  }])
  const [loading, setLoading] = useState(false);

  const fetchDuneBasicDataFromServer = () => {


    setLoading(true);
    fetch('https://dune-vis-srv.onrender.com/query/' + 2377610).then(res => {
      console.log('res', res);

      return res.json()
    }).then(data => {
      console.log("RECEIVED DATA", data);
      if (data.result['rows']) {
        const formatData = data.result['rows'].map((r: any) => {
          return {
            name: r.staker,
            value: r.TotalSdexValueStaked
          }
        })
        setLoading(false);
        setQueryData([...formatData])
      }
    })

  }

  useEffect(() => {
    fetchDuneBasicDataFromServer()
  }, [])

  console.log('query data', queryData);
  return (
    <div className='flex flex-wrap'>
      <div className='flex flex-col lg:flex-[50%] md:flex-[100%] items-center'>
        <div className='flex flex-col'>
          <p className='text-center text-lg text-white'>
            Top 50 stakers in Sdex
          </p>
          <p className='text-center text-lg text-white/40'>
            Dune Query : #{2377610}
          </p>
        </div>
        <div className='min-w-[48vw] min-h-[750px]'>
          <Suspense fallback={
            <div className='h-full w-full justify-center items-center text-white/80'>
              <ClipLoader
                color={'#36d7b7'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Loading Chart...
            </div>
          } >
            {loading && <div className='h-full w-full flex flex-col gap-5 items-center mt-24 text-white/80 animate-pulse '>
              <ClipLoader
                color={'#36d7b7'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Loading Chart...
            </div>}
            {!loading && <Chart data={queryData.slice(0, 50)} />}
          </Suspense>
        </div>
      </div>

      <div className='flex-col max-h-[650px] lg:flex-[50%] md:flex-[100%] min-w-[48vw] px-3'>
        <div className='flex flex-col mb-8'>
          <p className='text-center text-lg text-white'>
            Total Stakers in Sdex {loading ? '-' : queryData.length}
          </p>
          <p className='text-center text-lg text-white/40'>
            Total Sdex staked : {loading ? '-' : queryData.reduce((acc, cur) => acc + cur.value, 0)}
          </p>
        </div>
        <div className='header font-bold px-4 flex justify-between'>
          <div>
            Staker (addr)
          </div>
          <div>
            Sdex
          </div>
        </div>
        <div className='overflow-y-scroll px-4  max-h-[350px]'>
          {loading ? (
            <div className="flex justify-center mt-3 animate-pulse "> fetching data... </div>
          ) :
            queryData.map((data, index) => (
              <div className='flex text-sm text-white justify-between' key={index + data.name.slice(0, 10)}>
                <a className='text-white/70 hover:text-white/80' href={`https://etherscan.io/address/${data.name}`} target="_blank" > {data.name.slice(0, 10)}...{data.name.slice(data.name.length - 5, data.name.length)} </a>
                <div className=''>{data.value} </div>
              </div>
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default App
