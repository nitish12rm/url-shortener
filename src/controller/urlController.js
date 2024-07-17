const UrlService = require("../service/urlServices");

class UrlController {
    constructor() {
        this.urlService = new UrlService();
        this.shortenUrl = this.shortenUrl.bind(this); 
        this.redirectToOrgUrl = this.redirectToOrgUrl.bind(this);
        this.clickAnalytics = this.clickAnalytics.bind(this);
    }

    async shortenUrl(req, res) {
        console.log(this.urlService); // Debugging log
        const body = req.body;
        const result = await this.urlService.generateNewShortUrl(body.url);

        if (result.success) {
            return res.status(201).json({ id: result.shortID, message: result.message });
        } else {
            return res.status(500).json({ message: result.message });
        }
    }

    async redirectToOrgUrl(req, res) {
        const shortId = req.params.id;
        console.log(`Redirecting shortId: ${shortId}`); // Debugging log
        try {
            const result = await this.urlService.findOrgUrl(shortId);
            if (!result.success) {
                res.status(404).json({ message: result.message });
            } else {
                console.log(`Redirecting to URL: ${result.entry}`); // Debugging log
                res.redirect(result.entry.redirectUrl);
            }
        } catch (error) {
            console.error('Error redirecting:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async clickAnalytics(req, res){
      const shortId = req.params.id;
      
      try {
        const result = await this.urlService.findOne(shortId);
        if (!result.success) {
            res.status(404).json({ message: result.message });
        } else {
           
            res.status(200).json({totalClicks: result.entry.visitHistory.length,message:result.entry});
        }
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }
    
}

module.exports = UrlController;
