const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req, res, next){

    //Get token from the header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        return res.status(401).json({msg: 'No, token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token,process.env.jwtSecret);

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }
};
/**[
    {
        "sharedWith": [],
        "_id": "629e4a40237ab451ab56d0d9",
        "user": "629e4826237ab451ab56d0d3",
        "title": "Journal1",
        "content": "Lorem ipsum ........",
        "dateCreated": "2022-06-06T18:31:41.024Z",
        "lastModified": "2022-06-06T18:31:41.024Z",
        "category": "miscellaneous",
        "isFavorites": false,
        "__v": 0
    }
] */
// {
//     "email":"sazzy2311@gmail.com",
//     "password":"sazzy123"
   
// }