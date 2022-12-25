const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ik3p7tj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);

async function run() {
    try {
        const infoCollecton = client.db("redPositive").collection("information");
        
        app.get('/info', async (req, res) => {
            const query = {};
            const result = await infoCollecton.find(query).toArray();
            res.send(result);
        })
        app.post('/info', async (req, res) => {
            const redInfo = req.body;
            console.log(redInfo);
            const result = await infoCollecton.insertOne(redInfo);
            res.send(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('red positive server is running');
})

app.listen(port, () => console.log(`red positive running on ${port}`))