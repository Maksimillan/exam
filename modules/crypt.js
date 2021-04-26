const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken')
const saltRounds = 10;
const secret_word='Qalesan'

async function genHash(data) {
    let salt=await  bcrypt.genSalt(saltRounds)
    let hash= await bcrypt.hashSync(data,salt)
    return hash     
}

async function confimhash(data,hash){
    let compare =await bcrypt.compareSync(data,hash)
    return compare
}
 
function genToken(data){
 return JWT.sign(data,secret_word)
}

function chekToken(data){
    return JWT.verify(data,secret_word)
}
module.exports={
genHash,confimhash,genToken,chekToken,
}