import { Suspense, useEffect, useState } from 'react'
import VolumeBarChart from './Components/volumeBarChart';
import ClipLoader from "react-spinners/ClipLoader";

import './App.css'

function App() {
  const [queryData, setQueryData] = useState([{
    name: '',
    value: 0,
  }])

  const QUERY_SDEX_V_ID = 2632547;
  const [loading, setLoading] = useState(false);

  const fetchDuneVolumeFromServer = () => {

    console.log("Calling the bend");
    fetch('http://localhost:8080/query/volume/' + 2620571).then(res => {
      console.log("Hello");
      return res.json()
    }).then(data => {
      console.log("RECEIVED DATA", data);
      if (data) {
        const formatData = data.map((r: any) => {
          return {
            day: r.timestamp,
            volume: r.volume,
            priceUsd: r.price,
            volumeValue: r.volume * r.price
          }
        })
        setLoading(false);
        setQueryData([...formatData])
      }
    })

  }

  const fetchSdexDuneVolumeFromServer = () => {

    console.log("Calling the bend");
    fetch('http://localhost:8080/query/volume/sdex/' + QUERY_SDEX_V_ID).then(res => {
      console.log("Hello");
      return res.json()
    }).then(data => {
      console.log("RECEIVED DATA", data);
      if (data) {
        const formatData = data.map((r: any) => {
          return {
            day: r.timestamp,
            volume: r.volume,
            priceUsd: r.price,
            volumeValue: r.volume * r.price
          }
        })
        setLoading(false);
        setQueryData([...formatData])
      }
    })

  }

  useEffect(() => {
    console.log("START");
    setLoading(true);
    // fetchDuneVolumeFromServer()
    fetchSdexDuneVolumeFromServer()
  }, [])

  console.log('query data', queryData);
  return (
    <div className='flex flex-col md:flex-row  w-[100vw] '>
      <div className='flex flex-col grow-[1] items-center'>
        <div className='flex flex-col'>
          <p className='text-center text-lg text-white'>
            Total Volume of SDEX
          </p>
          <p className='text-center text-lg text-white/40'>
            Dune Query : #{QUERY_SDEX_V_ID}
          </p>
        </div>
        <div className=' min-h-[750px] min-w-[500px]'>
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
            {!loading && <VolumeBarChart data={queryData} />}
          </Suspense>
        </div>
      </div>

      <div className='flex-col grow-[1] max-h-[650px] px-3'>
        <div className='flex flex-col mb-8 max-w-[400px]'>
          <p className='text-center text-lg text-white'>
            Total Volume of tx At{loading ? '-' : queryData.length}
          </p>
          {/* <p className='text-center text-lg text-white/40'>
            Total Sdex staked : {loading ? '-' : queryData.reduce((acc, cur) => acc + cur.value, 0)}
          </p> */}
        </div>
        {/* <div className='header font-bold px-4 flex justify-between'>
          <div>
            Staker (addr)
          </div>
          <div>
            Sdex
          </div>
        </div> */}
        {/* <div className='overflow-y-scroll px-4  max-h-[350px]'>
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
        </div> */}
      </div>


    </div>
  )
}

export default App
