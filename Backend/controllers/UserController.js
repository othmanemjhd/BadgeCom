import { db } from "../model/Connection.js";

    
export const getAllPresentUsersByCompany = (req,res) => {
        const id_company = req.params.id_company;
        console.log("id_company : "+id_company)
       const q = "SELECT * FROM users u ,companies c , inouts i WHERE u.id_user = i.id_user AND u.id_company = c.id_company AND u.id_user = i.id_user AND i.date_entree IS NOT NULL AND id_company = ?"
       db.query(q,id_company,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
       })
}
export const getAllPresentTodayUsersByCompany = (req,res) =>{
        const id_company = req.params.id_company;
        console.log("id_company :"+id_company)
       const q = "SELECT * FROM users u , companies c ,  inouts i WHERE u.id_user = i.id_user AND u.id_company = c.id_company AND u.id_user = i.id_user AND  date_entree IS NOT NULL AND date_sortie IS NULL AND DATE(date_entree) = CURDATE() AND u.id_company = ?"
       db.query(q,id_company,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
       })
}



export const addUser = (req ,res) => {
       // const query = "INSERT INTO USERS (`first_name`,`last_name`,`id_company`) VALUES (?)"
       console.log(req.body)
       const { first_name, last_name, company_name } = req.body;
        db.query('CALL AddNewUserWithCompany(?,?,?)',[first_name, last_name, company_name],(err,data)=>{
              if(err) return res.json(err)
              return res.json("User has been created successfully")       
        })
        
}

export const getAllUsers = (req ,res) => {
        const query = "SELECT u.*, company_name FROM users u JOIN companies c ON u.id_company = c.id_company;"
        db.query(query,(err,data)=>{
              if(err) return res.json(err)
              return res.json(data)       
        })
        
}
 
    export const getAllUsersByCompany = (req, res) => {
        const id_company = req.params.id_company;
        const query = "SELECT u.*, company_name FROM users u JOIN companies c ON u.id_company = c.id_company WHERE u.id_company= ? ;";
        
        db.query(query, [id_company], (err, users) => {
            if (err) {
                console.error("Error fetching users by company:", err);
                return res.status(500).json({ error: "An error occurred while fetching users." });
            }
            res.json(users);
        });
    };

export const getUserById = (req ,res) => {
        const id_user = req.params.iduser;
        const query = "SELECT * FROM users WHERE id_user = ? "
        db.query(query,id_user,(err,data)=>{
              if(err) return res.json(err)
              return res.json(data)       
        })
        
}
export const updateUser = (req,res) => {
        const iduser = req.params.iduser;
        const query = "UPDATE users SET `first_name` = ? , `last_name` = ?  WHERE id_user = ? "
        const values = [
               req.body.firstName,
               req.body.lastName,
        ]
        db.query(query,values,(err,data) => {
                if(err) return res.json(err)
                return res.json ("The user "+userid+" have been updated successfully")
        })
}

export const deleteUser = (req,res) => {
        const iduser = req.params.iduser;
        const query = "DELETE FROM users  WHERE id_user = ? "
      
        db.query(query,iduser,(err,data) => {
                if(err) return res.json(err)
                return res.json ("The user "+iduser+" have been deleted successfully")
        })
}