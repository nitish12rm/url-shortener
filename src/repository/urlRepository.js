const URL = require("../model/url");

class UrlRepository{

     async createShortUrl(url){
        try {
            return await URL.create(url);
        } catch (error) {
            console.error('Error saving:', error);
            return null;
        }
     }

     async findUrl(shortId){
        try{
            const entry = await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}});
            return entry;
        }catch(error){
            console.error('id not found:', error);
            return null;

        }
     }
     async find(shortId){
        try{
            const entry = await URL.findOne({shortId});
            return entry;
        }catch(error){
            console.error('id not found:', error);
            return null;

        }
     }
    
    
}
module.exports = UrlRepository;