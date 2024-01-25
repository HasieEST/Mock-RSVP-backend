import app from "./app.js"
const port = 3006

app.listen(port, ()=> {
    console.log('Started server at port: '+ port)
})