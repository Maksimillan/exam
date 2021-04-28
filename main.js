const express=require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs/promises')
const app = express()
const {MongoClient}=require('mongodb')
const assert =require('assert')
const url='mongodb://localhost:27017';
const dbName='exam';
const client =new MongoClient(url); 
let PORT = 5050
app.listen(PORT)
const {genHash,confimhash,genToken,chekToken} = require('./modules/crypt')
const cookieParser = require('cookie-parser')




app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',first)

app.get('/login',(req,res)=>{
    if(req.cookies.token){
        res.render('acaunt',{
            error:''
        })
    }else{
        res.render('login',{
            error: '' 
         })
    }
})
app.get('/acaunt',(req,res)=>{
    res.render('acaunt')
})

app.get('/signup',(req,res)=>{
    res.render('signup',{
       error:'' 
    })
    
})
app.get('/phone',(req,res)=>{
    res.render('phones',{
       error:'' 
    })
})
app.get('/laptops',(req,res)=>{
    res.render('laptops',{
       error:'' 
    })
})
app.get('/tv',(req,res)=>{
    res.render('tv',{
       error:'' 
    })
})

app.get('/appliance',(req,res)=>{
    res.render('appliance',{
       error:'' 
    })
})
app.get('/appliance',(req,res)=>{
    res.render('appliance',{
       error:'' 
    })
})
app.get('/',(req,res)=>{
    res.render('appliance',{
       error:'' 
    })
})
app.get('/cart',(req,res)=>{
    res.render('cart1')
})







const data=[]

    
async function first(requiest,response){
    let homePath = await path.join(__dirname,'views','home.ejs')
    let file = await fs.readFile(homePath,'utf8')
    await response.send(file)
}

app.post('/login',async(requiest,response)=>{
    try{
        let{login , password}=requiest.body
        let comlogin=await data.find(x=>x.login == login)
        let comparol=await confimhash(password,comlogin.password)
        if((login && password)){
           if(comlogin,comparol){
            
            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
              db.collection('examBackend',(err,res)=>{
                  res.insertOne({ism:`${login}`,parol:`${password}`},(err,res)=>{
                     console.log(err);
                  })
              })
                
              });  
        
            let token=genToken(login)
            response.cookie('token',token);
            
            let homePath = await path.join(__dirname,'views','acaunt.ejs')
            let file = await fs.readFile(homePath,'utf8')
            await response.send(file)
            }
           else {
            throw new Error('Parol  is not defined or login is not defined')   
            
           }
        }
      }
      catch(e){
        response.render('login',{
            error: e + ''
        })
       }
})

app.post('/signup',async(requiest,response)=>{
    try{
        let{login,password,gender,phone}=requiest.body
        if((login && password,gender,phone)){
           let hash= await genHash(password)
           if(data.find(x=>x.login == login)){
            throw new Error('User already exists')
             }
             else{
                 data.push({
                     login,
                     password:hash,
                     gender,
                     phone  
                 })
             }
        
        }
        let homePath = await path.join(__dirname,'views','login.ejs')
        let file = await fs.readFile(homePath,'utf8')
        await response.send(file) 
      }
      catch(e){
        response.render('signup',{
            error: e + ''
        })
       }
})

const cost=[
    {prodact:'Samsung_xolodilnik_RT38K5535EF_WT',sell:170,name:'Samsung холодильник RT38K5535EF WT',photo:'../photo/холодилник1.jpg'},
    {prodact:'Samsung_RL4353EBASL_WT',sell:140,name:'Samsung холодильник RL4353EBASL WT',photo:'../photo/xolodilnik2.jpg'},
    {prodact:'xolodilnik_Samsung_RB29FSRNDSA_WW',sell:190,name:'Samsung холодильник RB29FSRNDSA WW',photo:'../photo/xolodilnik3.jpeg'},
    {prodact:'Samsung_RT32FAJBDWW_WT',sell:190,name:'Samsung холодильник RT32FAJBDWW WT',photo:'../photo/3.jpg'},
    {prodact:'Samsung_Notebook_9_Pro',sell:750,name:'Samsung Notebook 9 Pro',photo:'../photo/Notebook-9-Pro.jpg'},
    {prodact:'Samsung_Notebook_9_Pen',sell:500,name:'Samsung Notebook 9 Pen',photo:'../photo/Front_Open_Blue..jpg'},
    {prodact:'Samsung_NP_550P5C_S02RU',sell:650,name:'Samsung Notebook 550P5C S02RU',photo:'../photo/30015253b.jpg'},
    {prodact:'samsung_a_30',sell:190,name:'samsung phone A 30',photo:'../photo/a30.webp'},
    {prodact:'Samsung_Galaxy_A60',sell:250,name:'Samsung Galaxy A60',photo:'../photo/a60.webp'},
    {prodact:'Samsung_Galaxy_A6s',sell:350,name:'Samsung Galaxy A6s',photo:'../photo/a6s.webp'},
    {prodact:'Samsung_Galaxy_A50s',sell:300,name:'Samsung Galaxy A50s',photo:'../photo/A50s.jpg'},
    {prodact:'Samsung_Smart_TV_LED_8000',sell:600,name:'Samsung Smart TV LED 8000',photo:'../photo/samsungtv4.jpg'},
    {prodact:'Samsung_UE26_EH4000W',sell:1000,name:'Samsung tv UE26 EH4000W',photo:'../photo/samsungtv3.jpg'},
     {prodact:'Samsung_QLED',sell:800,name:'Samsung tv QLED',photo:'../photo/samsungtv2.png'},
    {prodact:'Samsung_202_Crystal',sell:700,name:'Samsung tv  202 Crystal',photo:'../photo/samsungtv.webp'}

]

 let data2=[]

app.post(['/appliance','/phone','/tv','/laptops'],async(requiest,response)=>{
     let {numberProdact,nameProdact}= await requiest.body
     if(numberProdact,nameProdact){
      let findProdact= cost.find(x=>x.prodact==nameProdact)
      let count= findProdact.sell*numberProdact
        data2.push({
         count:count,
         photo:findProdact.photo,
         name:findProdact.name,
         numberProdact:numberProdact
        })
       let data3=[]
       data2.forEach(element => {
            data3.push(element.count)
       });
       const reducer = (accumulator, currentValue) => accumulator + currentValue;
       let x=data3.reduce(reducer)
       
        response.render('cart',{
         count:count,
         photo:findProdact.photo,
         name:findProdact.name,
         numberProdact:numberProdact,
         data2,x
     })
     } 
 })
 
 


 




