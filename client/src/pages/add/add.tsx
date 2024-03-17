import React, { ChangeEvent, useEffect, useState } from "react";
import AddCSS from "./add.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

interface Company {
  id_company: number;
  company_name: string;
}

const add = () => {
  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    id_company: 0,
    company_name: "",
  });
  const handleItemClick = (company: Company) => {
    const company_name = company.company_name;
    newUser.company_name = company_name;
    newUser.id_company = company.id_company;
    setSelectedCompany(company_name);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [selectedCompany, setSelectedCompany] = useState<string>(
    "Choisissez votre entreprise"
  );

  const navigate = useNavigate();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await axios.post(url + "/users/add", newUser);
      console.log(newUser);
      navigate("/entree");
    } catch (error) {
      console.log(error);
    }
  };
  //fetch all companies
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(url + "/companies/all");
        setCompanies(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
  return (
    <div className={AddCSS.entree}>
      <div className={AddCSS.card}>
        <h1>BadgeEase</h1>
        <form className={AddCSS.form}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">
              Prénom :
            </label>
            <input
              onChange={handleChange}
              placeholder="Saisissez votre prénom"
              type="text"
              className="form-control"
              id="prenom"
              aria-describedby="prenom"
              name="first_name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">
              Nom :
            </label>
            <input
              placeholder="Saisissez votre nom"
              type="text"
              className="form-control"
              id="nom"
              name="last_name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company_name" className="form-label">
              Entreprise :
            </label>
            <Dropdown style={{ width: "500px" }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCompany}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: "50%",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {companies.map((company) => (
                  <Dropdown.Item
                    className={AddCSS.item}
                    key={company.id_company}
                    href="#"
                    onClick={() => handleItemClick(company)}
                  >
                    {company.company_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className={AddCSS.btn}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default add;
