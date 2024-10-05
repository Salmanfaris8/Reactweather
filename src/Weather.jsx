import React, { useEffect, useState } from 'react'
import { TextField,Button } from '@mui/material'
import axios from 'axios'
import image1 from '../src/assets/img1.png'

const Weather = () => {
    
    const [weatherDetails,setWeatherDetails] = useState(0)
    const [weatherDetailsAPI,setWeatherDetailsAPI]= useState(0)

    const places = weatherDetails
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${places}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
    

    const commonAPI = async (httpMethod,url,reqBody)=>{
        const requestConfig ={
            method:httpMethod,
            url,
            data:reqBody
        }        
        return await axios(requestConfig).then((res)=>{
            return res
        }).catch(err=>{
            return err 
        })
    }


    const uploadWeatherAPI =  async ()=>{
        return await commonAPI("GET",WEATHER_URL,"")
    }

    useEffect(()=>{
        uploadWeatherAPI()
    },[])

    const getWeatherDetails = async () =>{
        const response = await uploadWeatherAPI()
        // console.log(response);
        setWeatherDetailsAPI(response.data)
    }
        console.log(weatherDetailsAPI);
        
    
  return (
    <div style={{height:'100vh'}} className='image-d1 border'>
        <h1 className="text-center fw-bolder pt-4">Weather Search App</h1>
        <div className="con-d1 d-flex justify-content-center mt-5"> 
            <TextField onChange={e=>setWeatherDetails(e.target.value)} id="standard-search" label="Enter a Place" className='input-d1' variant="standard" />
            <Button onClick={getWeatherDetails} className='mt-3 ms-3' color='dark' variant='outlined'>Search</Button>
        </div>
        <div className="d-flex justify-content-center">
            <div className="row container d-flex justify-content-center py-5 ">
            <div className="col-md-8 col-lg-6 col-xl-5">
                {
                    weatherDetailsAPI?
                <div className="card text-body bg-dark" style={ {borderRadius:'35px'}}>
                        <div className="card-body p-4">
                
                        <div className="d-flex">
                        <h3 className="flex-grow-1 text-center text-white">{weatherDetailsAPI.name}</h3>
                        {/* <h6 className='text-white'>{weatherDetailsAPI.timezone}</h6> */}
                        </div>
                
                        <div className="d-flex flex-column text-center mt-5 mb-4">
                        <h6 className="display-4 mb-0 font-weight-bold text-white"> {weatherDetailsAPI.main.temp}°C </h6>
                        <span className="small text-white">{weatherDetailsAPI.weather.map((item)=>(item.main))}</span>
                        </div>
                
                        <div className="d-flex align-items-center">
                        <div className="flex-grow-1" style={{fontSize:'1rem'}}>
                            <div className='mt-2'><i className="fa-solid fa-temperature-quarter fs-5 ms-1" style={{color:'#868B94'}}></i> <span className="ms-2 text-white"> {weatherDetailsAPI.main.feels_like}°C
                            </span></div>
                            <div className='mt-2'><i className="fas fa-wind fa-fw fs-5" style={{color:'#868B94'}}></i> <span className="ms-2 text-white"> {weatherDetailsAPI.wind.speed} km/h
                            </span>
                            </div>
                            <div className='mt-2'><i className="fas fa-tint fa-fw fs-5" style={{color:'#868B94'}}></i> <span className="ms-2 text-white"> {weatherDetailsAPI.main.humidity}%
                            </span></div>
                            <div className='mt-2'><i className="fa-solid fa-earth-europe fs-5 ms-1" style={{color:'#868B94'}}></i> <span className="ms-2 text-white"> {weatherDetailsAPI.sys.country}
                            </span></div>
                        </div>
                        <div>
                            <img src={image1}
                            width="100px"/>
                        </div>
                        </div>
                    </div>
                </div>
                :
                ""
                }
                </div>
            
            </div>
        </div>
    </div>
  )
}

export default Weather