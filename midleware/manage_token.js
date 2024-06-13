const jwt = require('jsonwebtoken');
require('dotenv').config();
 
async function get_payload_with_token(token){
    let data ;
    await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        data = user
    })
    return data
}
async function create_new_token(payload) {
    return await jwt.sign(payload, process.env.SECRET_KEY)
}
module.exports = {
    get_payload_with_token,
    create_new_token
};
