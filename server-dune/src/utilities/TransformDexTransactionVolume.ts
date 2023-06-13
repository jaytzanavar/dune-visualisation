import { ethers } from 'ethers';

const calculateVolumeOfSdex = (data: Array<unknown>): Array<unknown> => {
  
  
  const dataVolume = data.map((d: any) => ({
    ...d,
    volume: ethers.utils.formatUnits(d.value, d.decimal1 )
  }));
  
  const aggregateTxSdexVolume = Object.values(dataVolume.reduce((res, obj) => {
    const { timestamp, volume, symbol1, symbol2  } = obj;
    if (res.hasOwnProperty(timestamp)) {
      res[timestamp].volume += Number(volume)
    }
    else {
        res[timestamp] = { 
          timestamp, 
          volume: Number(volume), 
          token1: symbol1,
          token2: symbol2
        }
    }

    return res
  }, {}))
  
  return aggregateTxSdexVolume;
}

export default calculateVolumeOfSdex;