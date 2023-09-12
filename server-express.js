import express from "express";
// import bodyParser from 'body-parser'
import pg from 'pg';
// const pool = new pg.Pool()

const app = express();

app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}))

const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')

app.listen(3000)


app.get('/', (req,res) => {
    // const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')

    // const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
//     const client = new pg.Client({
//     host:'localhost',
//     port:'5432',
//     database:'js_shop',
//     user:'postgres',
//     password:'postsql123'
// })
    client.connect( (err) => {
        if(err) {
            throw err
        }
    
        client.query(`Select * FROM products`, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Table displayed')
            res.send(data.rows)
    
            client.end()
        }) 
    
    } )
    
})

app.get('/clients', (req,res) => {
    // const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
    client.connect( err=> {
        if(err){
            throw err
        }

        client.query(`Select * FROM clients`, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Table displayed')
            res.send(data.rows)
    
            client.end()
        })
    } )
})

app.get('/clients/:id', (req,res) => {
    const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
    client.connect( err=> {
        if(err){
            throw err
        }
        const id = req.params
        client.query(`Select * FROM clients WHERE id = ${id}`, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Client displayed')
            res.send(data.rows)
    
            client.end()
        })
    } )
} )

app.post('/clients/add', (req,res) => {
    const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
    client.connect( err=> {
        if(err){
            throw err
        }
        const {name, address, phone, email, password} = req.body
        
        client.query(`INSERT INTO clients(name,address,phone,email,password) VALUES('${name}', '${address}','${phone}', '${email}','${password}') `, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Client added')
            console.log(data)
            res.send(data)
    
            client.end()
        })
    } )
})



app.patch('/clients/:id', (req,res) => {
    const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
    client.connect( err=> {
        if(err){
            throw err
        }
        const newClient = req.body

        const oldUserReq = client.query(`SELECT * FROM clients WHERE id = ${req.params.id} `)
        const oldUser = oldUserReq.rows
        console.log(oldUser)
        
        client.query(`UPDATE clients SET(name ,address , phone , email ,password) = ('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') WHERE id  = ${req.params.id}`, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Client changed')
            console.log(data)
            res.send(data)
    
            client.end()
        })
    } )
})

app.delete('/clients/:id', (req,res) => {
    const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
    client.connect( err=> {
        if(err){
            throw err
        }
        const id = req.params
        client.query(`DELETE from clients WHERE id = ${req.params.id}`, (err,data) => {
            if (err) {
                throw err
            }
            console.log('>>> Client deleted')
            res.send(data.rows)
    
            client.end()
        })
    } )
} )



 


