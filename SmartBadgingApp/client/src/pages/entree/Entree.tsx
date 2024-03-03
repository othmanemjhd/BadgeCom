import React, { useEffect, useState } from "react";
import EntreeCSS from "./Entree.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Dropdown } from "react-bootstrap";
import axios from "axios";

interface User {
  idUser: number;
  last_name: string;
  first_name: string;
  company_name: number;
}

interface Company {
  idcompany: number;
  company_name: string;
}

const Entree = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>(
    "Choisissez votre entreprise"
  );

  //fetch all companies
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/companies");
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
    setSelectedCompany(company.company_name);
    try {
      const res = await axios.get(
        "http://localhost:8800/api/users/company/" + company.idcompany
      );
      setUsers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRowClick = async (user: User) => {
    const confirmMessage = `Confirmez-vous votre entrée Mr : "${user.last_name}" "${user.first_name}" ?`;
    const isConfirmed = window.confirm(confirmMessage);

    // Exécuter la fonction si l'utilisateur confirme
    if (isConfirmed) {
      // Exécuter la fonction associée à l'élément de menu
      console.log(`Exécuter la fonction pour user id : "${user.idUser}"`);
      // Ajoutez ici votre logique pour exécuter la fonction
      try {
        const res = await axios.post("http://localhost:8800/api/users/in/add", {
          id: user.idUser,
        });
        if (res.data.includes("already")) {
          setErrorMessage(
            `USER : ${user.first_name} ${user.last_name} WITH ID ${user.idUser} : est déja entré(e) !`
          );
        } else {
          setSuccessMessage("Votre date d'entrée a été bien ajoutée !");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Annulé");
    }
    console.log("user id clicked is : " + user.idUser);
  };
  const navigate = useNavigate();

  return (
    <div className={EntreeCSS.entree}>
      <div className={EntreeCSS.card}>
        <div className={EntreeCSS.top}>
          <h1>BadgeEase</h1>
          {/* <p>
            Explorez le chemin vers une gestion d'accès sans faille avec
            BadgeEase, votre compagnon numérique pour un contrôle fluide et
            sécurisé des entrées et sorties. Du bureau à l'entrepôt, simplifiez
            vos processus de badgeage avec notre solution intuitive et efficace,
            conçue pour répondre à vos besoins professionnels en évolution
            constante.
          </p> */}
        </div>
        <div className={EntreeCSS.bottom}>
          <div className={EntreeCSS.entreprise}>
            <h2>Entreprise : </h2>
            <div className={EntreeCSS.dropdown}>
              <Dropdown>
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
                      className={EntreeCSS.item}
                      key={company.idcompany}
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
          <div className={EntreeCSS.content}>
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
                    <th className="scope"></th>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Entreprise</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.idUser} onClick={() => handleRowClick(user)}>
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          ></label>
                        </div>
                      </th>
                      <th scope="row">{user.idUser}</th>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.company_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
            {errorMessage && (
              <Alert
                variant="danger"
                onClose={() => setErrorMessage(" ")}
                dismissible
              >
                {errorMessage}
              </Alert>
            )}
          </div>
          <div className={EntreeCSS.btn}>
            <Link to="/add" className="btn btn-primary">
              Ajouter nouveau employé
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entree;
