 
--
-- Database: `THIS`
--
--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
 
CREATE TABLE `companies` (
  `id_company` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_company`),
  UNIQUE KEY `id_company_UNIQUE` (`id_company`),
  UNIQUE KEY `company_name_UNIQUE` (`company_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id_company`, `company_name`) VALUES
(2, 'ABYLSEN'),
(1, 'AECOM'),
(3, 'AMARIS'),
(5, 'COORDEF'),
(6, 'HOME'),
(4, 'SHELL');

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
 
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `id_company` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  KEY `company_name_idx` (`id_company`),
  CONSTRAINT `id_company` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Table structure for table `inouts`
--

DROP TABLE IF EXISTS `inouts`;
 
CREATE TABLE `inouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `date_entree` datetime NOT NULL,
  `date_sortie` datetime DEFAULT NULL,
  `dateEntreeDate` date GENERATED ALWAYS AS (cast(`date_entree` as date)) VIRTUAL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idEntreeSortie_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

 
 
