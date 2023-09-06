import express from "express";
import pg from 'pg';

const app = express();

app.listen(3000)

app.get('/', (req,res) => {

    const client = new pg.Client('postgres://postgres:postsql123@localhost:5432/js_shop')
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

 


