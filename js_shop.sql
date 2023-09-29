CREATE DATABASE "js_shop";
CREATE TABLE products(
    id SERIAL,
    name character varying(30),
    description character varying(400),
    image character varying(100),
    price integer
);

INSERT INTO products VALUES (1, 'Samsung Galaxy A32 4G A325', E'Capacitatea acumulatorului - 5000 mAh\nMemorie internă - 64 GB\nRAM - 4 GB\nDimensiune ecran - 6.4\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM', 'https://enter.online/images/product/2022/12/enter-samsung-galaxy-a32-a325-14676.png', 6000  );
INSERT INTO products VALUES (2, 'Samsung Galaxy M52 5G',E'Capacitatea acumulatorului - 5000 mAh\nMemorie internă - 128 GB\nRAM - 6 GB\nDimensiune ecran - 6.7\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM', 'https://enter.online/images/product/2022/12/enter-samsung-galaxy-m52-4341318.png' , 10000);
INSERT INTO products VALUES (3, 'Samsung Galaxy A52 4G A525',E'Capacitatea acumulatorului - 4500 mAh\nMemorie internă - 128 GB\nRAM - 4 GB\nDimensiune ecran - 6.5\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM', 'https://enter.online/images/product/2022/12/enter-samsung-galaxy-a52-a525-5652.png',  7599);



CREATE TABLE clients(
    id SERIAL PRIMARY KEY,
    name character varying(40),
    address character varying(100),
    phone integer,
    email character varying(50),
    password character varying(50) --chkpass
);

ALTER TABLE products
ALTER COLUMN image TYPE character varying(100);


-- /d+ arata tabelul cu coloanele si tipul de date

INSERT INTO clients VALUES(1,'John Doe', 'Missisippi str.20', 12345874, 'johndoe@email.example', 'password1');
INSERT INTO clients VALUES(2,'Marry Poppins', 'bd.Decebal 20, Chisinau', 58745758, 'marypoppins@email.example', 'password2');
INSERT INTO clients(name,address,phone,email,password) VALUES(3,'Jone Doe', 'Chicago, 40 str.', 854752358, 'janedoe@email.example', 'password3');
INSERT INTO clients(name,address,phone,email,password) VALUES('Kate Doe', 'Ohio, 10 str.', 069392566, 'katedoe@email.example', 'password5');


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE clients(
    id SERIAL PRIMARY KEY,
    name character varying(40),
    address character varying(100),
    phone integer,
    email character varying(50),
    password character varying(50) --chkpass
);


CREATE TABLE client_sessions(
    session_id uuid DEFAULT uuid_generate_v4(),
    client_id integer,
    PRIMARY KEY (session_id),
        CONSTRAINT client_sessions_fk
            FOREIGN KEY (client_id)
            REFERENCES clients (id)
            ON DELETE CASCADE

);
-- nu functioneaza
ALTER TABLE client_sessions
ADD CONSTRAINT client_sessions_fk
FOREIGN KEY (client_id)
REFERENCES clients (id)
ON DELETE CASCADE;

