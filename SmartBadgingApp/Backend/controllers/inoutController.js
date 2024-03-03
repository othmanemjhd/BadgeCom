import db from "../model/Connection.js";



// Function to check if data exists for today for a specific user
function dataExistsForToday(userId) {
    const today = new Date().toISOString().split('T')[0];
    const query = "SELECT * FROM `INOUT` WHERE id_user = ? AND DATE(dateEntree) = ? ";
    return new Promise((resolve, reject) => {
        db.query(query, [userId, today], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}


// // Middleware to check if data exists for today before calling addInUser
// async function checkDataExists(req, res, next) {
//     const userId = req.body.id_user; // Assuming id_user is sent in the request body
//     try {
//         const exists = await dataExistsForToday(userId);
//         if (exists) {
//             res.status(400).json({ error: 'Data already exists for today' });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.error('Error checking data: ' + error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// function addInUserData(userId) {
//     const today = new Date().toISOString().split('T')[0];
//     const query = `INSERT INTO inout (id_user, indate) VALUES (?, ?)`;
//     connection.query(query, [userId, today], (err, results) => {
//         if (err) {
//             console.error('Error inserting data: ' + err);
//         } else {
//             console.log('Data added for today');
//         }
//     });
// }

// Function to insert data into inout table
export async function  addInUser (req,res) {
    try {
        // Check if data exists for today for the specific user
        const userId = req.body.id; // Assuming id_user is sent in the request body
        console.log(req.body)
        const exists = await dataExistsForToday(userId, db);

        // If data doesn't exist for today for the specific user, insert new data
        if (!exists) {
            const today = new Date() ;
            console.log("IN DATE OF TODAY :"+today)
            const query = "INSERT INTO `INOUT` (id_user, dateEntree) VALUES (?, ?)";
            db.query(query, [userId, today], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.json('Internal server error');
                } else {
                    console.log('Data added for today');
                    res.json('Data added successfully');
                }
            });
        } else {
            res.json( 'Data already exists for today');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        res.json('Internal server error');
    }
}

export const addOutUser = (req,res) =>{
    console.log(req.body)
    const id = req.body.id;
    const today = new Date() ;
    const values = [
        today,
            id,
            
     ]
    const q  = "UPDATE `INOUT` SET  `dateSortie` = ? WHERE id_user = ? AND DATE(`dateEntree`) = CURDATE() "
    db.query(q , values,(err,data)=>{
            if(err) return res.json(err)
            return res.json(data+"OUT date of userid : "+id+" has been added")
    })
}