module.exports = (req, res) => {
    if(req.method === 'GET'){
        res.json([
            {url: "https://www.youtube.com/watch?v=BhArBPtW6Ms"}
        ])
    }else {

    }
}