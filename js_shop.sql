CREATE DATABASE "js_shop";
CREATE TABLE products(
    id integer PRIMARY key,
    name character varying(30),
    description character varying(400),
    image bytea,
    price integer
);

INSERT INTO products VALUES (1, 'Samsung Galaxy A32 4G A325', E'Capacitatea acumulatorului - 5000 mAh\nMemorie internă - 64 GB\nRAM - 4 GB\nDimensiune ecran - 6.4\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM',null, 6000  );
INSERT INTO products VALUES (2, 'Samsung Galaxy M52 5G',E'Capacitatea acumulatorului - 5000 mAh\nMemorie internă - 128 GB\nRAM - 6 GB\nDimensiune ecran - 6.7\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM',null, 10000);
INSERT INTO products VALUES (3, 'Samsung Galaxy A52 4G A525',E'Capacitatea acumulatorului - 4500 mAh\nMemorie internă - 128 GB\nRAM - 4 GB\nDimensiune ecran - 6.5\nTip display - Super AMOLED\nNumărul de SIM - Dual SIM', null,  7599);

INSERT INTO products(image) VALUES('https://enter.online/images/product/2022/12/enter-samsung-galaxy-a52-a525-5652.png' );