import db from "../model/Connection.js";



// Function to check if data exists for today for a specific user
function dataExistsForToday(userId) {
    const today = new Date().toISOString().split('T')[0];
    const query = "SELECT * FROM inouts WHERE id_user = ? AND DATE(date_entree) = ? ";
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
            const query = "INSERT INTO inouts (id_user, date_entree) VALUES (?, ?)";
            db.query(query, [userId, today], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.json('Internal server error');
                } else {
                    console.log('IN Data added successfully for today');
                    res.json('IN Data added successfully');
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
    const q  = "UPDATE inouts SET  `date_sortie` = ? WHERE id_user = ? AND DATE(`date_entree`) = CURDATE() "
    db.query(q , values,(err,data)=>{
            if(err) return res.json(err)
            console.log('OUT Date added successfully for today of userid : '+id);
            return res.json(data+"OUT date of userid : "+id+" has been added")
    })
}