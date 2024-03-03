import { db } from "../model/Connection.js";

    
export const getAllPresentUsersByCompany = (req,res) => {
        const idcompany = req.params.idcompany;
        console.log(idcompany)
       const q = "SELECT * FROM USERS u ,COMPANIES c , `INOUT` i WHERE u.idUser = i.id_user AND u.id_company = c.idcompany AND u.idUser = i.id_user AND i.dateEntree IS NOT NULL AND id_company = ?"
       db.query(q,idcompany,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
       })
}
export const getAllPresentTodayUsersByCompany = (req,res) =>{
        const idcompany = req.params.idcompany;
        console.log(idcompany)
       const q = "SELECT * FROM USERS u , COMPANIES c ,  `INOUT` i WHERE u.idUser = i.id_user AND u.id_company = c.idcompany AND u.idUser = i.id_user AND  dateEntree IS NOT NULL AND dateSortie IS NULL AND DATE(dateEntree) = CURDATE() AND id_company = ?"
       db.query(q,idcompany,(err,data)=>{
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
        const query = "SELECT u.*, company_name FROM users u JOIN companies c ON u.id_company = c.idcompany;"
        db.query(query,(err,data)=>{
              if(err) return res.json(err)
              return res.json(data)       
        })
        
}
 
    export const getAllUsersByCompany = (req, res) => {
        const idcompany = req.params.idcompany;
        const query = "SELECT u.*, company_name FROM users u JOIN companies c ON u.id_company = c.idcompany WHERE u.id_company= ? ;";
        
        db.query(query, [idcompany], (err, users) => {
            if (err) {
                console.error("Error fetching users by company:", err);
                return res.status(500).json({ error: "An error occurred while fetching users." });
            }
            res.json(users);
        });
    };

export const getUserById = (req ,res) => {
        const iduser = req.params.iduser;
        const query = "SELECT * FROM USERS WHERE idUser = ? "
        db.query(query,iduser,(err,data)=>{
              if(err) return res.json(err)
              return res.json(data)       
        })
        
}
export const updateUser = (req,res) => {
        const iduser = req.params.iduser;
        const query = "UPDATE USERS SET `first_name` = ? , `last_name` = ?  WHERE idUser = ? "
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
        const query = "DELETE FROM USERS  WHERE idUser = ? "
      
        db.query(query,iduser,(err,data) => {
                if(err) return res.json(err)
                return res.json ("The user "+iduser+" have been deleted successfully")
        })
}