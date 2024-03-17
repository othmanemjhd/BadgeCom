import React, { useEffect, useState } from "react";
import EntreeCSS from "./Entree.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Dropdown } from "react-bootstrap";
import axios from "axios";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
</style>;

interface User {
  id_user: number;
  last_name: string;
  first_name: string;
  company_name: number;
}

interface Company {
  id_company: number;
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
  // const url = "https://badgecom.onrender.com/api";
  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
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

  const [users, setUsers] = useState<User[]>([]);

  const handleCompanyFilter = async (company: Company) => {
    setSelectedCompany(company.company_name);
    try {
      const res = await axios.get(url + "/users/company/" + company.id_company);
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
      console.log(`Exécuter la fonction pour user id : "${user.id_user}"`);
      // Ajoutez ici votre logique pour exécuter la fonction
      try {
        const res = await axios.post(url + "/users/in/add", {
          id: user.id_user,
        });
        if (res.data.includes("already")) {
          setErrorMessage(
            `USER : ${user.first_name} ${user.last_name} WITH ID ${user.id_user} : est déja entré(e) !`
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setSuccessMessage("Votre date d'entrée a été bien ajoutée !");
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Annulé");
    }
    console.log("user id clicked is : " + user.id_user);
  };
  const navigate = useNavigate();

  return (
    <div className={EntreeCSS.entree}>
      <div className={EntreeCSS.card}>
        <div className={EntreeCSS.top}>
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
        <div className={EntreeCSS.bottom}>
          <div className={EntreeCSS.entreprise}>
            <h2>Entreprise : </h2>
            <div className={EntreeCSS.dropdown}>
              <Dropdown>
                <Dropdown.Toggle
                  className={EntreeCSS.toggle}
                  variant="success"
                  id="dropdown-basic"
                >
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
          <div className={EntreeCSS.content}>
            <div className={EntreeCSS.tableContainer}>
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
                    <tr key={user.id_user} onClick={() => handleRowClick(user)}>
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
                      <th scope="row">{user.id_user}</th>
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
          <div className={EntreeCSS.addBtn}>
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
