import express from 'express'
import mongoose from 'mongoose'

import hello from './model.js'

const nirvi =  express()
const uri = process.env.MONGODB_URI
mongoose.connect(uri)
 
nirvi.use(express.json())

nirvi.get('/', (request, response) => {
    response.json({
        mess:"the url shortner is working"
    })
})

nirvi.get('/:hello', async (request,response)=>{
    const short = await hello.findOne({ short: request.params.hello})
    if (short == null) return response.sendStatus(404)
    response.redirect(`${short.longurl}`)  
})

nirvi.post('/short', async (request, response) => {
    const found = await hello.findOne({ longurl: request.params.longurl })
    if ( found > 0 ) {
        response.send(found)
    }
    else {
        await hello.create({ longurl: request.params.longurl })
        const newfinding = await hello.findOne({ longurl: request.params.longurl })
        response.send(newfinding)
    }
})


// {shorturl: "dfhsfgh", longurl: "https://google.com/"}

const port = process.env.PORT || 5050

nirvi.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
})
