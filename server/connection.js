const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('node', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
});

async function connection (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connection();

// const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "node"
// });

// function getAllPolls(){
//     con.connect(function(err) {
//         if (err) throw err;
//             con.query("SELECT * FROM polls", function (err, result, fields) {
//         if (err) throw err;
//             console.log(result);
//             return result;
//         });
//     });
// }

// function getPollById(id){
//     con.connect(function(err) {
//         if (err) throw err;
//             con.query(`SELECT * FROM polls WHERE id = ${id}`, function (err, result, fields) {
//         if (err) throw err;
//             console.log(result);
//             return result;
//         });
//     });
// }

// function createNewPoll(object){
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         const sql = "INSERT INTO polls (title, start, end, label, score, status) VALUES ?";
//         let values = []
//         object.options.forEach((option) => {
//             values.push([object.title, object.start, object.end, option.label, option.score, object.status]);
//         });
//         con.query(sql, [values], function (err, result) {
//             if (err) throw err;
//             console.log("Number of records inserted: " + result.affectedRows);
//         });
        
//     });
// }

// function updatePollOptionScore(id, score){

//     con.connect(function(err) {
//         if (err) throw err;
//             const sql = `UPDATE polls SET score = ${score} WHERE id = ${id}`;
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log(result.affectedRows + " record(s) updated");
//         });
//     });
// }

// function updatePollStatus(id, status){

//     con.connect(function(err) {
//         if (err) throw err;
//             const sql = `UPDATE polls SET status = ${status} WHERE id = ${id}`;
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log(result.affectedRows + " record(s) updated");
//         });
//     });
// }

// function deletePoll(id){

//     con.connect(function(err) {
//         if (err) throw err;
//             const sql = `DELETE FROM customers WHERE id = ${id}`;
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log(result.affectedRows + " record(s) updated");
//         });
//     });
// }

// let object = {
//     title: "what is your favorite animal?",
//     start: "16/08/2022",
//     end: "22/08/2022",
//     status: 1,
//     options: [
//         {
//             label: "dog",
//             score: 0
//         },
//         {
//             label: "cat",
//             score: 0,
//         },
//         {
//             label: "bird",
//             score: 0,
//         }
//     ]
// }

// // createNewPoll(object);
// updatePollOptionScore(4, 5)