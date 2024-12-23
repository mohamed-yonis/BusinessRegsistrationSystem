import mongoose from "mongoose";

import { dburl } from "./config.js";


const ConnectDb = async () =>{

  console.log("Connect",dburl)
    try{
      await mongoose.connect(dburl, {
      
      })
      console.log("Connected Successfully!");
    }
    catch(e){
       console.log(`error occcured ${e}`);
       process.exit(1)
    }
}

export default ConnectDb;