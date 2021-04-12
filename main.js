const express=require('express')
const ejs=require('ejs')
const path=require('path')
const fs=require('fs/promises')
// const moongose =require('mongoose')
const app=express()
let PORT=8081
// const Todos=require('./routes/todos')


app.get('/',home)
app.get('/acaunt', acaunt)
// app.use(Todos)
// app.set('views','views')

async function home(req,res){
    let homePath=path.join(__dirname,'views','home.ejs')
    let file = await fs.readFile(homePath,'utf8')
   await res.send(file)
}

async function acaunt(req,res){
    let acauntPath=path.join(__dirname,'views','acaunt.ejs')
    let file =await fs.readFile(acauntPath,'utf8')
    await res.send(file)
} 
app.listen(PORT)
// async function start(){
//     try{
//         await moongose.connect('mongodb+srv://Maksimillian:<password>@cluster0.8mmw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//             useNewUrlParser:true,
//             useFindAndModify:false

//         })
//         app.listen(PORT,()=>{console.log(  `${PORT}`)})
//     }catch(e){
//         console.log(e);
//     }
// }
// start() 