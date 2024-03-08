CREATE DEFINER=`root`@`localhost` PROCEDURE `AddNewUserWithCompany`(
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_company_name VARCHAR(255)
)
BEGIN
    DECLARE v_id_company INT;

    -- Insérer l'entreprise si elle n'existe pas
    INSERT INTO companies (company_name) 
    SELECT p_company_name 
    FROM dual 
    WHERE NOT EXISTS (SELECT 1 FROM companies WHERE company_name = p_company_name);

    -- Récupérer l'ID de l'entreprise (nouvelle ou existante)
    SELECT id_company INTO v_id_company 
    FROM companies 
    WHERE company_name = p_company_name;

    -- Insérer l'utilisateur avec l'ID de l'entreprise
    INSERT INTO users (id_company, first_name, last_name) 
    VALUES (v_id_company, p_first_name, p_last_name);

END