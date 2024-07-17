const { nanoid}  = require("nanoid");
const UrlRepository = require("../repository/urlRepository")

class UrlServices{
    constructor(){
        this.urlRepository = new UrlRepository();
    }
    async generateNewShortUrl(url){
        console.log(url);
        if(!url) return {success:false, message:"url is required"}
        const shortID = nanoid(8);
        
       const result = await this.urlRepository.createShortUrl({
            shortId:shortID,
            redirectUrl:url,
            visitHistory:[]
        })
       if(!result){
        return {success:false, message:"failed"}
       }
       else{
        return {success:true, shortID} 
       }
    }

    async findOrgUrl(shortId){
        if(!shortId) return {success:false, message:"shortid is required"}

        const entry = await this.urlRepository.findUrl(shortId);

        if(entry!=null) return{success:true,entry};
         return {success:false,message:"error"};
    }
    async findOne(shortId){
        if(!shortId) return {success:false, message:"shortid is required"}

        const entry = await this.urlRepository.find(shortId);

        if(entry!=null) return{success:true,entry};
         return {success:false,message:"error"};
    }
}
module.exports = UrlServices;