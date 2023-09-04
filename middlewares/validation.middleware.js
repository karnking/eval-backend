const ValidationMiddleware = (req,res,next) =>{
    const {Title,Content,Author,Category,Image} = req.body
    if(!Title || typeof Title != "string" || !Content || typeof Content!="string" || !Author || typeof Author !="string" || !Category || typeof Category!="string" || !Image || typeof Image!="string"){
        res.status(400).send({err:"data is incorrect"})
    }else{
        next()
    }
}
module.exports = {ValidationMiddleware}