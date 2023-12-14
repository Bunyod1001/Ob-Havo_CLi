
import getArgs from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js"
import {printError, printSuccess, printHelp, printWeather} from "./services/log.services.js"
import { saveKayeValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const saveToken = async token => {
  if(!token.length){
    printError("Doesn't exist")
    return
  }
  try {
    await saveKayeValue(TOKEN_DICTIONARY.token,token)   
    printSuccess("Token was saved")
  } catch (error) {
    printError(error.message )
  }
}


const saveCity = async city => {
  if(!city.length){
    printError("City Doesn't exist")
    return
  }
  try {
    await saveKayeValue(TOKEN_DICTIONARY.city,city)   
    printSuccess("city was saved")
  } catch (error) {
    printError(error.message )
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
    const response =await getWeather(city)
    printWeather(response, getIcon(response.weather[0].icon))
  } catch (error) {
    if(error?.response?.status == 404){
      printError("City not found")
    }else if(error?.response?.status == 401){
      printError("Invalid token")
    }else{
      printError(error.message)
    }
  }
}

const startCli = () =>{
    const args = getArgs(process.argv)
    // console.log(process.env);
  if (args.h){
   return printHelp()
    // help
  }
  if (args.s){
  return  saveCity(args.s)
    // save city
  }
  if (args.t) {
  return saveToken(args.t)
    // save token 
  }
//   "result" ni ko'rsatish kerak 
 getForecast()
}

startCli()