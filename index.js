const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2b4mnlf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
        serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
        }
});

async function run() {
        try {
                // await client.connect();
                // More code will be here
                const collegeCollection = client.db("endGame").collection("colleges");

                app.get('/allColleges', async (req, res) => {
                        const result = await collegeCollection.find().toArray();
                        res.send(result);
                })



                await client.db("admin").command({ ping: 1 });
                console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
                // await client.close();
        }
}
run().catch(console.dir);


app.get('/', (req, res) => {
        res.send('Hello World!')
})

app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})