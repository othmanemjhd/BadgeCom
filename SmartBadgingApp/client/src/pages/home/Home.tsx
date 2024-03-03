import React from "react";
import { Link } from "react-router-dom";
import homeCSS from "./home.module.scss";
const Home = () => {
  const handleEntree = () => {};

  const handleSortie = async () => {};
  return (
    <div className={homeCSS.home}>
      <div className={homeCSS.card}>
        <div className={homeCSS.left}>
          <h1>BadgeEase</h1>
          <p>
            Explorez le chemin vers une gestion d'accès sans faille avec
            BadgeEase, votre compagnon numérique pour un contrôle fluide et
            sécurisé des entrées et sorties. Du bureau à l'entrepôt, simplifiez
            vos processus de badgeage avec notre solution intuitive et efficace,
            conçue pour répondre à vos besoins professionnels en évolution
            constante.
          </p>
        </div>
        <div className={homeCSS.right}>
          <h1>Ready.</h1>
          <form>
            <button className={homeCSS.entree} onClick={handleEntree}>
              <Link
                to="/Entree"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Entree
              </Link>
            </button>

            <button className={homeCSS.sortie} onClick={handleSortie}>
              <Link
                to="/sortie"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sortie
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
