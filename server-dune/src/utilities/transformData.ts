import { ethers } from 'ethers';

const calculateDailyVolumeOfTransaction = (data: Array<unknown>): Array<unknown> => {

  const dataVolume = data.map((d: any) => ({
    ...d,
    volume: ethers.utils.formatUnits(d.totalValue, 18 )
  }));
 
  const aggregateVolume = Object.values(dataVolume.reduce((res, obj) => {
    const { timestamp, volume, token0price } = obj;
    if (res.hasOwnProperty(timestamp)) {
      res[timestamp].volume += Number(volume)
    }
    else {
        res[timestamp] = { 
          timestamp, 
          volume: Number(volume), 
          price: token0price ? token0price : 0.00001,
        }
    }

    return res
  }, {}))
  
  return aggregateVolume;
}

export default calculateDailyVolumeOfTransaction;