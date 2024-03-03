import db from "../model/Connection.js";


export const getAllCompanies = (req ,res) => {
    const q = "SELECT * FROM companies "

    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
        
}