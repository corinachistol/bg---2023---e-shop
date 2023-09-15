import fastify from 'fastify'
const authenticate = {realm: 'Westeros'}
import { v4 as uuid4 } from 'uuid'

export async function authRoutes(fastify,option){

    fastify.post('/signin', async (req,reply) => {
        
        const  client = await fastify.pg.connect()
        const { email,password } = req.body
        // console.log(req.body.email)
        // console.log(req.body.password)

        try {
            const matchClient = await client.query(`SELECT * FROM clients WHERE email = '${email}' AND password = '${password}' `)
            // console.log(matchClient.rows)
            // console.log(matchClient.rows[0].id)
           
            if(matchClient){
                const session_id = await client.query(`INSERT INTO client_sessions (client_id) VALUES ('${matchClient.rows[0].id}')`)
                reply.code(200).send({status: "success", session_id: session_id }) // respond with a 200 ok { status: "success", session_id: "..." } 
            }else{
                reply.code(401).send({message: "Authorization failed, Wrond Credentials"})
            }

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }
    })


    fastify.delete('/signout', async(req,reply)=> {
        const  client = await fastify.pg.connect()
    

        try {
            const res = await client.query(`DELETE FROM client_sessions WHERE session_id = '${req.body.session_id}' `)
            console.log(`client session ${req.body.session_id} was deleted`)
            // console.log(res)
            reply.code(200).send({ status: "success"})
        
            
        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

    })

    
}
