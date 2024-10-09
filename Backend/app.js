const express = require('express')
const mongoose = require('mongoose')

const hello =  require('./model')

const nirvi =  express()
const uri = process.env.URI
mongoose.connect(uri)
 
nirvi.use(express.json())

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
