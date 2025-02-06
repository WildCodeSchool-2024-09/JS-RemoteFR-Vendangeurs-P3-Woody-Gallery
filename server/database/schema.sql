CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL
);
CREATE TABLE addresses (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    street_number VARCHAR(10) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postal_code VARCHAR(15) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    user_id INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE TABLE ratings (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    comment VARCHAR(120) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE collections (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE collections_users (
    user_id INT NOT NULL,
    collection_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (collection_id) REFERENCES collections(id),
    PRIMARY KEY (user_id, collection_id)
);

CREATE TABLE photos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(1100) NOT NULL,
    format VARCHAR(13) NOT NULL,
    stock INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE NOT NULL,
    collection_id INT NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collections(id)
);

CREATE TABLE orders (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    articles VARCHAR(1000) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status ENUM('préparation','livraison','terminé') DEFAULT 'préparation',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE photos_orders (
    order_id INT NOT NULL,
    photo_id INT NOT NULL,
    PRIMARY KEY (order_id, photo_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (photo_id) REFERENCES photos(id)
);

CREATE TABLE orders_users (
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    PRIMARY KEY (user_id, order_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO collections(id, name)
VALUES
  (1, 'Tokyo Modern'),
  (2, 'Tokyo Traditionnel'),
  (3, 'Munich'),
  (4, 'Alpes Françaises');

INSERT INTO photos(id, name, image, description, format, stock, price, collection_id)
VALUES
  (1, "Akihabara", "/assets/photos/Akihabara.jpg", "Akihabara est un quartier commerçant animé connu pour ses boutiques d'électronique, qui vont des petits stands aux grands magasins comme Yodobashi Multimedia Akiba. Le Tokyo Anime Center, avec ses expositions et souvenirs, et le Radio Kaikan, un bâtiment de 9 étages qui propose des jouets, des cartes à échanger et des objets de collection, font partie des établissements spécialisés dans les mangas, les anime et les jeux vidéo. À proximité, du thé et des desserts sont servis dans les maid cafés, où le personnel porte un uniforme de domestique.", "55x25cm", 24, 24.99 , 1),
  (2, "Cimetière d'Aoyama", "/assets/photos/Cimetiere_Aoyama.jpg", "Le cimetière d'Aoyama est un cimetière situé dans le quartier de Minato à Tokyo au Japon et géré par le gouvernement métropolitain de Tokyo. Le cimetière, célèbre pour ses cerisiers en fleurs, est très visité pendant la saison du hanami.", "20x34cm", 0, 32.50, 1),
  (3, "La tour de Tokyo", "/assets/photos/Tour_Tokyo.jpg","La tour de Tokyo est une tour rouge et blanche située dans l'arrondissement de Minato à Tokyo au Japon. Son concept est fondé sur celui de la tour Eiffel de Paris. Elle a été réalisée par l'architecte Tachū Naitō. La tour mesure 332,6 mètres de haut, ce qui en fait l'une des plus hautes tours en métal du monde.", "20x42cm", 20, 39.99, 1),
  (4, "Shibuya Scramble Crossing", "/assets/photos/Shibuya_Scramble_Crossing.jpg", "Shibuya Crossing est un carrefour situé dans le quartier de Shibuya à Tokyo au Japon, connu pour ses passages zébrés pour piétons dont l'un en diagonale traverse le centre du carrefour.", "42x19cm", 5, 34.99, 1),
  (5, "Shibuya road","/assets/photos/Shibuya_Road.jpg", "Shibuya est un des vingt-trois arrondissements spéciaux formant Tokyo, au Japon. L'arrondissement a été fondé en 1932. En même temps qu'au nom de l'arrondissement, le nom « Shibuya » se rapporte à la gare et au quartier d'affaires autour de la gare.", "20x42cm", 11, 24.99, 1),
  (6, "Shibuya center","/assets/photos/Shibuya_Center.jpg", "Shibuya est un des vingt-trois arrondissements spéciaux formant Tokyo, au Japon. L'arrondissement a été fondé en 1932. En même temps qu'au nom de l'arrondissement, le nom « Shibuya » se rapporte à la gare et au quartier d'affaires autour de la gare.", "20x42cm", 10, 24.99, 1),
  (7, "Shinjuku","/assets/photos/Shinjuku.jpg", "L'arrondissement de Shinjuku inclut les salles de karaoké et les discothèques animées du quartier East Shinjuku, illuminé par de nombreux néons, et les restaurants et bars d'hôtel haut de gamme du Skyscraper District. Le Tokyo Metropolitan Building comporte une plateforme d'observation populaire, et le mont Hakone s'élève au-dessus d'un parc urbain paisible. Les galeries, cinémas et librairies attirent les étudiants des campus très fréquentés. Le New National Stadium est un stade high-tech construit pour les Jeux olympiques de 2020.", "20x42cm", 15, 29.99, 1),
  (8, "Shinjuku de nuit","/assets/photos/Shinjuku_night.jpg", "L'arrondissement de Shinjuku inclut les salles de karaoké et les discothèques animées du quartier East Shinjuku, illuminé par de nombreux néons, et les restaurants et bars d'hôtel haut de gamme du Skyscraper District. Le Tokyo Metropolitan Building comporte une plateforme d'observation populaire, et le mont Hakone s'élève au-dessus d'un parc urbain paisible. Les galeries, cinémas et librairies attirent les étudiants des campus très fréquentés. Le New National Stadium est un stade high-tech construit pour les Jeux olympiques de 2020.", "20x42cm", 5, 34.99, 1),
  (9, "Tokyo Skytree","/assets/photos/Tokyo_Skytree.jpg", "La Tokyo Skytree est une tour de radiodiffusion du Japon, située dans l'arrondissement Sumida de Tokyo. Haute de 634 mètres, elle devient, le jour de son inauguration en 2012, la deuxième plus haute structure autoportante du monde après Burj Khalifa.", "20x42cm", 2, 32.50, 1),
  (10, "Temple de d'Hasedera","/assets/photos/Hasedera.jpg", "Le Hase-dera est un temple bouddhiste de la secte Jōdo, situé sur les hauteurs de Kamakura. Il a été fondé en 736 par Fusasaki Fujiwara.", "42x19cm", 9, 34.99, 2),
  (11, "Kōtoku-in","/assets/photos/Kotoku-in.jpg", "Le Kōtoku-in est un temple bouddhiste du Jōdo shū situé à Kamakura dans la préfecture de Kanagawa au Japon. Le temple est connu pour son « Grand Bouddha », une monumentale statue en bronze d'Amitābha Bouddha qui est l'une des plus célèbres icônes du Japon.","20x42cm", 7, 24.99, 2),
  (12, "Meiji-jingū","/assets/photos/Meiji-jingu.jpg", "Le Meiji-jingū ou sanctuaire Meiji, est un sanctuaire shintoïste situé en plein cœur de Tokyo, dans l'arrondissement de Shibuya, en bordure du quartier Harajuku.", "42x19cm", 11, 34.99, 2),
  (13, "Mont Fuji","/assets/photos/mont_fuji.jpg", "Le mont Fuji est une montagne du centre du Japon qui se trouve sur la côte sud de l'île de Honshū, au sud-ouest de l'agglomération de Tokyo. Avec 3 776 mètres d'altitude, il est le point culminant du Japon.","42x19cm", 15, 39.99, 2),
  (14, "Ōmiya Hachiman-gū", "/assets/photos/omiya-Hachiman-gu-Torii.jpg", "Le sanctuaire Ōmiya Hachiman est un sanctuaire shinto situé à Suginami, Tokyo, Japon. C'est un sanctuaire Hachiman, dédié au kami Hachiman. Il a été créé en 1063. Son festival principal a lieu chaque année le 15 septembre.","20x42cm", 12, 29.99, 2),
  (15, "Ōmiya Hachiman-gū", "/assets/photos/omiya-Hachiman-gu.jpg", "Le sanctuaire Ōmiya Hachiman est un sanctuaire shinto situé à Suginami, Tokyo, Japon. C'est un sanctuaire Hachiman, dédié au kami Hachiman. Il a été créé en 1063. Son festival principal a lieu chaque année le 15 septembre.","20x42cm", 8, 32.50, 2),
  (16, "Yasukuni-jinja", "/assets/photos/Yasukuni-jinja.jpg", "Le Yasukuni-jinja, ou sanctuaire Yasukuni est un sanctuaire shinto, situé dans l'arrondissement de Chiyoda à Tokyo, au Japon. Il a été construit en 1869 pour rendre hommage aux Japonais « ayant donné leur vie au nom de l'empereur du Japon ».", "20x42cm", 5, 29.99, 2),
  (17, "Zugspitze Montagne 1", "/assets/photos/Zugspitze1.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 10, 39.99, 3),
  (18, "Zugspitze Montagne 2", "/assets/photos/Zugspitze2.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 15, 34.99, 3),
  (19, "Zugspitze Montagne 3", "/assets/photos/Zugspitze3.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 1, 32.50, 3),
  (20, "Zugspitze Montagne 4", "/assets/photos/Zugspitze4.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 5, 24.99, 3),
  (21, "Zugspitze Montagne 5", "/assets/photos/Zugspitze5.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 15, 24.99, 3),
  (22, "Zugspitze Montagne 6", "/assets/photos/Zugspitze6.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 20, 24.99, 3),
  (23, "Zugspitze Montagne 7", "/assets/photos/Zugspitze7.jpg", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 11, 24.99, 3),
  (24, "Aiguille de la Vanoise 1", "/assets/photos/Aiguille-de-la-Vanoise1.jpg", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 16, 24.99, 4),
  (25, "Aiguille de la Vanoise 2", "/assets/photos/Aiguille-de-la-Vanoise2.jpg", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 12, 24.99, 4),
  (26, "Aiguille de la Vanoise 3", "/assets/photos/Aiguille-de-la-Vanoise3.jpg", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 19, 29.99, 4),
  (27, "Aiguille de la Vanoise 4", "/assets/photos/Aiguille-de-la-Vanoise4.jpg", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "20x42cm", 14, 29.99, 4),
  (28, "Chamonix-Mont-Blanc 1", "/assets/photos/Chamonix-Mont-Blanc1.jpg", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "42x20cm", 9, 32.50, 4),
  (29, "Chamonix-Mont-Blanc 2", "/assets/photos/Chamonix-Mont-Blanc2.jpg", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "20x42cm", 5, 29.99, 4),
  (30, "Chamonix-Mont-Blanc 3", "/assets/photos/Chamonix-Mont-Blanc3.jpg", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "42x20cm", 18, 29.99, 4),
  (31, "Col de la Vanoise", "/assets/photos/Col-de-la-Vanoise.jpg", "Le col de la Vanoise est un col des Alpes françaises situé à 2 517 mètres d'altitude dans le parc national de la Vanoise. Il permet l'accès entre les localités de Pralognan-la-Vanoise et Termignon, appartenant respectivement aux vallées de la Tarentaise et de la Maurienne, dans le département de la Savoie.", "42x20cm", 5, 34.99, 4),
  (32, "Lac des Vaches", "/assets/photos/Lac-des-vaches1.jpg", "Le lac des Vaches est un lac situé en France sur la commune de Pralognan-la-Vanoise, dans le département de la Savoie en région Auvergne-Rhône-Alpes. Il s'agit d'un lac de montagne du massif de la Vanoise et du parc national de la Vanoise, culminant à 2 318 mètres d'altitude.", "20x42cm", 8, 39.99, 4);

INSERT INTO users ( id, firstname, lastname, email, password, is_admin)
VALUES 
( 1 , "Woody", "Gallery", "woody@gmail.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 1),
( 2 , "Woody", "Gallery", "woody2@gmail.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 3 , "Benoît", "Vandanjon", "benoît@vandanjon.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 4 , "Anthony", "Gorski", "antho@poudlard.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 5 , "Ayoub", "Idrissi Ouedrhiri", "ioayoub@io.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 6 , "Yavuz", "Kutuk", "Yavuz@president.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 7 , "Timoté", "Angoulême", "tim@gmail.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0),
( 8 , "Bernadette", "Machin", "bern@gmail.com", "$argon2d$v=19$m=65536,t=5,p=1$N1Dl3cqsJJzjhv9VcEZtpQ$LnawO/raZQGrIVWtYyHqar3+VXudyNMjePsrw3ZLkV8", 0);

INSERT INTO ratings (user_id, rating, comment, date)
VALUES 
(1, 5, "Les tableaux sont vraiment cool ! Je peux enfin habiller mes murs avec de magnifiques photos", '2024-12-11 15:17:07'),
(2, 4, "Je trouve que c'est cool. Take my money !!!", '2025-01-11 10:44:07'),
(3, 4, "Un peu cher et ça manque de dinosaures, mais sinon ces photos sont de bonne qualité", '2025-01-12 10:44:07'),
(4, 3, "Déçu, les personnes ne bougent pas", '2025-01-12 10:44:07'),
(5, 1, "Je suis un tyran, je n'aime donc pas ces photos", '2025-01-12 10:44:07'),
(6, 5, "Classe pour décorer mon super bureau de président", '2025-01-12 10:44:07'),
(7, 2, "Mouais, de mon temps nous proposions quelque chose de meilleur", '2025-01-11 15:17:07'),
(8, 1, "Bof joré fé ceu sitte otremant moa !!!!!", '2025-01-11 15:17:07');

INSERT INTO addresses ( id, street_number, street_name, postal_code, city, country, user_id)
VALUES 
(1, 8, 'rue du photographe', '13000', 'Marseille', 'France', 1),
(2, 8, 'rue du photographe', '13000', 'Marseille', 'France', 2),
(3, 16, 'avenue des dragibus', '85200', 'Fontenay-le-Comte', 'France', 3),
(4, 128, "allée l'OM", '13000', 'Marseille', 'France', 4),
(5, 666, 'place des enfers', '44170', 'Jans', 'France', 5),
(6, 1, "faubourg de l'Elysée", '67000', 'Strasbourg', 'France', 6);

INSERT INTO orders (id, articles, total_amount, user_id)
VALUES
(1, '[1,1,12,30]', 129.98, 2),
(2, '[4,5,6,30,30]', 144.95, 5),
(3, '[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]', 2990, 3);
