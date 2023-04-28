const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'farmer',

})

db.connect(error => {
    if (error) {
      console.error('Error connecting to MySQL:', error);
    } else {
      console.log('Connected to MySQL');
    //   setConnection(connection);
}
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.get("/api/select/" ,(req, res) => {
//     const aadhar_no= req.body.Aadhar;
//     console.log(aadhar_no);
//     const sqlSelect = "SELECT * FROM farmer_detail WHERE aadhar_no =?";
//     db.query(sqlSelect , [aadhar_no] , (err, result) =>{
//         res.send(result);
//     })
// })
app.post('/api/data', (req, res) => {
    const aadhar_no = req.body.adhaar;
    // console.log(aadhar_no);
    const sqlSelect = `SELECT wallet FROM farmer_detail WHERE aadhar_no = ${aadhar_no}`;
    db.query(sqlSelect , (err, result) =>{
        if (err) throw err;
        res.send(result);
    })
  
    // Do something with the variable here
   
  });
app.post("/api/insert/" , (req, res) => {
    const aadhar_no= req.body.aadhar_no;
    const wallet= req.body.wallet;
    const quantity= req.body.quantity;
    console.log(aadhar_no,wallet,quantity);
    res.send(aadhar_no,wallet,quantity);
    const sqlInsert = "INSERT INTO farmer_detail (aadhar_no,wallet,quantity) VALUES (?,?,?);";
    db.query(sqlInsert , [aadhar_no,wallet,quantity] , (err, result) =>{

    })
})

app.get("/" , (req, res) => {
    const sqlInsert = "INSERT INTO farmer_detail (aadhar_no,wallet,quantity) VALUES ('533167738410','sfdsflddf',5);";
    db.query(sqlInsert  , (err, result) =>{
        res.send("Suceees");
    })})
app.listen(3001, ()=>{
    console.log('running on port 3001')
});