const axios = require('axios')
const cheerio = require('cheerio')
const app = require("express")()
const port = process.env.PORT || 8008;

app.get('/',(req, res) => {
    res.status(200).send('<h1>Woodro\s novel data api</h1>')
})

app.get('/:ticker', async (req, res) => {
const {ticker} = req.params
const {key} = req.query
if( !ticker || !key){
    return res.status(400).send({message:"Please provide key and ticker"})
}
// res.send("bababoui")

// const { url } = getQuery(req);

// if( !url){
//     return res.status(400).send({message:"No URL provide. Please provide url"})
// }
try{
    const url = `https://novelfull.net/cultivation-chat-group/chapter-1-mt-yellows-true-monarch-and-nine-provinces-1-group.html`
    const {data} = await axios.get(url)
    const $ = cheerio.load(data)
    
    const chapTitle = $('.chapter-title').get().map(val => $(val).text())
    const novelText = $('.chapter-c').get().map(val => $(val).text())
    const novelName = $('.truyen-title').get().map(val => $(val).text())
    res.status(200).send({data: chapTitle, novelName, novelText})

}catch{
    res.status(500).send({message: err.message})
}





})
app.listen(port, () => console.log(`Server ha started on port: ${port}`))