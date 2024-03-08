import React, { useEffect, useState } from "react";
import SortieCSS from "./sortie.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Dropdown } from "react-bootstrap";
import axios from "axios";

interface User {
  id_user: number;
  last_name: string;
  first_name: string;
  company_name: string;
  date_entree: string;
}

interface Company {
  id_company: number;
  company_name: string;
}

const Sortie = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const url = "https://badgecom.onrender.com/api";
  //fetch all companies
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(url + "/companies");
        setCompanies(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);

  const [users, setUsers] = useState<User[]>([]);

  const handleCompanyFilter = async (company: Company) => {
    setSelectedCompany(company);
    console.log(company.company_name);
    try {
      const res = await axios.get(
        url + "/users/present/today/" + company.id_company
      );
      console.log("Users data:", res.data);
      setUsers(res.data);
      navigate("/sortie");
    } catch (error) {
      console.log(error);
    }
  };
  const handleRowClick = async (id: number) => {
    console.log("user id clicked is : " + id);
    try {
      const res = await axios.post(url + "/users/out/add", {
        id: id,
      });
      console.log(res.data);
      setSuccessMessage("Votre date de sortie a été bien ajoutée !");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second (adjust as needed)
      if (selectedCompany) {
        handleCompanyFilter(selectedCompany);
      } else {
        console.log("selectedCompany is empty");
        // Handle the case when selectedCompany is empty
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={SortieCSS.entree}>
      <div className={SortieCSS.card}>
        <div className={SortieCSS.top}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>BadgeEase</h1>
          </Link>
          {/* <p>
            Explorez le chemin vers une gestion d'accès sans faille avec
            BadgeEase, votre compagnon numérique pour un contrôle fluide et
            sécurisé des entrées et sorties. Du bureau à l'entrepôt, simplifiez
            vos processus de badgeage avec notre solution intuitive et efficace,
            conçue pour répondre à vos besoins professionnels en évolution
            constante.
          </p> */}
        </div>
        <div className={SortieCSS.bottom}>
          <div className={SortieCSS.entreprise}>
            <h2>Entreprise : </h2>
            <div className={SortieCSS.dropdown}>
              <Dropdown>
                {selectedCompany ? (
                  <Dropdown.Toggle
                    className={SortieCSS.toggle}
                    variant="success"
                    id="dropdown-basic"
                  >
                    {selectedCompany.company_name}
                  </Dropdown.Toggle>
                ) : (
                  <div>
                    <Dropdown.Toggle
                      className={SortieCSS.toggle}
                      variant="success"
                      id="dropdown-basic"
                    >
                      choisissez votre entreprise :
                    </Dropdown.Toggle>
                  </div>
                )}
                <Dropdown.Menu>
                  {companies.map((company) => (
                    <Dropdown.Item
                      className={SortieCSS.item}
                      key={company.id_company}
                      href="#"
                      onClick={() => handleCompanyFilter(company)}
                    >
                      {company.company_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className={SortieCSS.content}>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <table
                className="table table-striped table-hover"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Entreprise</th>
                    <th scope="col">Date entrée</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id_user}
                      onClick={() => handleRowClick(user.id_user)}
                    >
                      <th scope="row">{user.id_user}</th>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.company_name}</td>
                      <td>{new Date(user.date_entree).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                {/* Afficher le message de succès si successMessage n'est pas vide */}
                {successMessage && (
                  <Alert
                    variant="success"
                    onClose={() => setSuccessMessage(" ")}
                    dismissible
                  >
                    {successMessage}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sortie;
