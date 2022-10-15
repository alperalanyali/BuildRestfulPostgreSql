const {Pool} = require('pg');

const  pool = new Pool();
require('dotenv').config()
/*
const pool = new Pool({
    user:'postgres',
    password:'1234',
    database:'api',
    host:"localhost",
    port:5432
})*/
/*
const getCountries = async(req,res) =>{
        await pool.queery('SELECT * FROM Countries ORDER BY Id ASC',(error,result)=>{
            if(error)
                res.status(404).json(error)
            res.status(200).json(result.rows)
        })
}*/

const getCountries = (req,res) =>{
  try{
    pool.connect(async (error,client,release)=>{
       let resp =  await client.query(`select * from Countries`)
       res.send(resp.rows)
    })
  }catch(error){
      console.log(error);
  }

}

const createCountries = (req,res)=>{
    console.log(req.body);
    const {name,capital} = req.body
    try{
        pool.connect(async (error,client,release)=>{
            let resp =  await client.query(`insert into Countries(name,capital) values('${name}','${capital}')`)
            res.send(`${name}`)
         })
    }catch(error){
        console.log(error);
    }
}
const  getCountriesById = (req,res)=>{
    console.log(req.params.id);
    const  id = parseInt(req.params.id)
    try{
        pool.connect(async (error,client,release)=>{
            let resp =  await client.query(`select * from Countries where Id = '${id}'`)
            res.send(resp.rows)
            
         })
    }catch(error){
        console.log(error)

    }
}
const findCountriesBySearchKey = (req,res)=>{
    const searchKey  = req.params.search
    console.log(searchKey);
    try{
        pool.connect(async (error,client,release)=>{
            let resp =  await client.query(`select * from Countries where capital like '%${searchKey.toUpperCase()}%' or name like '%${searchKey.toUpperCase()}%'`)
            res.send(resp.rows)
            
         })
    }catch(error){
        console.log(error)

    }
}
const updateCountries = (req,res)=>{
    const id = parseInt(req.params.id)
    const {name,capital} = req.body
    pool.connect(async (error,client,release)=>{
        let resp =  await client.query(`update  Countries set name = '${name}', capital= '${capital}' where Id = '${id}'`)
        res.send('Updated successfully')
        
     })
}
const deleteCountriesById = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.connect(async (error,client,release)=>{
        let resp =  await client.query(`delete  from Countries where Id = '${id}'`)
        res.send('Deleted successfully')
        
     })
}
module.exports = {
    getCountries,
    createCountries,
    getCountriesById,
    updateCountries,
    deleteCountriesById,
    findCountriesBySearchKey
}