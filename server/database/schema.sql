CREATE TABLE addresses (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    street_number VARCHAR(10) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postal_code VARCHAR(15) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL
);


CREATE TABLE ratings (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE collections (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    address_id INT NULL,
    rating_id INT NULL,
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (rating_id) REFERENCES ratings(id)
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
    order_nb INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_done BOOLEAN DEFAULT FALSE NOT NULL
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

INSERT INTO orders (order_nb, is_done)
VALUES
(1, false),
(2, true);

INSERT INTO collections(id, name)
VALUES
  (1, 'Tokyo Modern'),
  (2, 'Tokyo Traditionnel'),
  (3, 'Munich'),
  (4, 'Alpes Françaises');


INSERT INTO photos(id, name, image, description, format, stock, price, collection_id)
VALUES
  (1, "Akihabara", "LIEN IMAGE", "Akihabara est un quartier commerçant animé connu pour ses boutiques d'électronique, qui vont des petits stands aux grands magasins comme Yodobashi Multimedia Akiba. Le Tokyo Anime Center, avec ses expositions et souvenirs, et le Radio Kaikan, un bâtiment de 9 étages qui propose des jouets, des cartes à échanger et des objets de collection, font partie des établissements spécialisés dans les mangas, les anime et les jeux vidéo. À proximité, du thé et des desserts sont servis dans les maid cafés, où le personnel porte un uniforme de domestique.", "55x25cm", 24, 24.99 , 1),
  (2, "Cimetière d'Aoyama", "LIEN IMAGE", "Le cimetière d'Aoyama est un cimetière situé dans le quartier de Minato à Tokyo au Japon et géré par le gouvernement métropolitain de Tokyo. Le cimetière, célèbre pour ses cerisiers en fleurs, est très visité pendant la saison du hanami.", "20x34cm", 10, 32.50, 1),
  (3, "La tour de Tokyo", "LIEN IMAGE","La tour de Tokyo est une tour rouge et blanche située dans l'arrondissement de Minato à Tokyo au Japon. Son concept est fondé sur celui de la tour Eiffel de Paris. Elle a été réalisée par l'architecte Tachū Naitō. La tour mesure 332,6 mètres de haut, ce qui en fait l'une des plus hautes tours en métal du monde.", "20x42cm", 20, 39.99, 1),
  (4, "Shibuya Scramble Crossing", "LIEN IMAGE", "Shibuya Crossing est un carrefour situé dans le quartier de Shibuya à Tokyo au Japon, connu pour ses passages zébrés pour piétons dont l'un en diagonale traverse le centre du carrefour.", "42x19cm", 5, 34.99, 1),
  (5, "Shibuya road","LIEN IMAGE", "Shibuya est un des vingt-trois arrondissements spéciaux formant Tokyo, au Japon. L'arrondissement a été fondé en 1932. En même temps qu'au nom de l'arrondissement, le nom « Shibuya » se rapporte à la gare et au quartier d'affaires autour de la gare.", "20x42cm", 11, 24.99, 1),
  (6, "Shibuya center","LIEN IMAGE", "Shibuya est un des vingt-trois arrondissements spéciaux formant Tokyo, au Japon. L'arrondissement a été fondé en 1932. En même temps qu'au nom de l'arrondissement, le nom « Shibuya » se rapporte à la gare et au quartier d'affaires autour de la gare.", "20x42cm", 10, 24.99, 1),
  (7, "Shinjuku","LIEN IMAGE", "L'arrondissement de Shinjuku inclut les salles de karaoké et les discothèques animées du quartier East Shinjuku, illuminé par de nombreux néons, et les restaurants et bars d'hôtel haut de gamme du Skyscraper District. Le Tokyo Metropolitan Building comporte une plateforme d'observation populaire, et le mont Hakone s'élève au-dessus d'un parc urbain paisible. Les galeries, cinémas et librairies attirent les étudiants des campus très fréquentés. Le New National Stadium est un stade high-tech construit pour les Jeux olympiques de 2020.", "20x42cm", 15, 29.99, 1),
  (8, "Shinjuku de nuit","LIEN IMAGE", "L'arrondissement de Shinjuku inclut les salles de karaoké et les discothèques animées du quartier East Shinjuku, illuminé par de nombreux néons, et les restaurants et bars d'hôtel haut de gamme du Skyscraper District. Le Tokyo Metropolitan Building comporte une plateforme d'observation populaire, et le mont Hakone s'élève au-dessus d'un parc urbain paisible. Les galeries, cinémas et librairies attirent les étudiants des campus très fréquentés. Le New National Stadium est un stade high-tech construit pour les Jeux olympiques de 2020.", "20x42cm", 5, 34.99, 1),
  (9, "Tokyo Skytree","LIEN IMAGE", "La Tokyo Skytree est une tour de radiodiffusion du Japon, située dans l'arrondissement Sumida de Tokyo. Haute de 634 mètres, elle devient, le jour de son inauguration en 2012, la deuxième plus haute structure autoportante du monde après Burj Khalifa.", "20x42cm", 2, 32.50, 1),
  (10, "Templde d'Hasedera","LIEN IMAGE", "Le Hase-dera est un temple bouddhiste de la secte Jōdo, situé sur les hauteurs de Kamakura. Il a été fondé en 736 par Fusasaki Fujiwara.", "42x19cm", 9, 34.99, 2),
  (11, "Kōtoku-in","LIEN IMAGE", "Le Kōtoku-in est un temple bouddhiste du Jōdo shū situé à Kamakura dans la préfecture de Kanagawa au Japon. Le temple est connu pour son « Grand Bouddha », une monumentale statue en bronze d'Amitābha Bouddha qui est l'une des plus célèbres icônes du Japon.","20x42cm", 7, 24.99, 2),
  (12, "Meiji-jingū","LIEN IMAGE", "Le Meiji-jingū ou sanctuaire Meiji, est un sanctuaire shintoïste situé en plein cœur de Tokyo, dans l'arrondissement de Shibuya, en bordure du quartier Harajuku.", "42x19cm", 11, 34.99, 2),
  (13, "Mont Fuji","LIEN IMAGE", "Le mont Fuji est une montagne du centre du Japon qui se trouve sur la côte sud de l'île de Honshū, au sud-ouest de l'agglomération de Tokyo. Avec 3 776 mètres d'altitude, il est le point culminant du Japon.","42x19cm", 15, 39.99, 2),
  (14, "Ōmiya Hachiman-gū", "LIEN IMAGE", "Le sanctuaire Ōmiya Hachiman est un sanctuaire shinto situé à Suginami, Tokyo, Japon. C'est un sanctuaire Hachiman, dédié au kami Hachiman. Il a été créé en 1063. Son festival principal a lieu chaque année le 15 septembre.","20x42cm", 12, 29.99, 2),
  (15, "Ōmiya Hachiman-gū", "LIEN IMAGE", "Le sanctuaire Ōmiya Hachiman est un sanctuaire shinto situé à Suginami, Tokyo, Japon. C'est un sanctuaire Hachiman, dédié au kami Hachiman. Il a été créé en 1063. Son festival principal a lieu chaque année le 15 septembre.","20x42cm", 8, 32.50, 2),
  (16, "Yasukuni-jinja", "LIEN IMAGE", "Le Yasukuni-jinja, ou sanctuaire Yasukuni est un sanctuaire shinto, situé dans l'arrondissement de Chiyoda à Tokyo, au Japon. Il a été construit en 1869 pour rendre hommage aux Japonais « ayant donné leur vie au nom de l'empereur du Japon ».", "20x42cm", 5, 29.99, 2),
  (17, "Zugspitze Montagne 1", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 10, 39.99, 3),
  (18, "Zugspitze Montagne 2", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 15, 34.99, 3),
  (19, "Zugspitze Montagne 3", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 1, 32.50, 3),
  (20, "Zugspitze Montagne 4", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 5, 24.99, 3),
  (21, "Zugspitze Montagne 5", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 15, 24.99, 3),
  (22, "Zugspitze Montagne 6", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","20x42cm", 20, 24.99, 3),
  (23, "Zugspitze Montagne 7", "LIEN IMAGE", "La Zugspitze est un sommet situé dans la chaîne des Alpes, dans le massif du Wetterstein, dans les Alpes bavaroises. C'est le point culminant de l'Allemagne, avec 2 962 mètres d'altitude. La Zugspitze se situe sur la frontière autrichienne, mais le point culminant est en Allemagne.","42x19cm", 11, 24.99, 3),
  (24, "Aiguille de la Vanoise 1", "LIEN IMAGE", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 16, 24.99, 4),
  (25, "Aiguille de la Vanoise 2", "LIEN IMAGE", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 12, 24.99, 4),
  (26, "Aiguille de la Vanoise 3", "LIEN IMAGE", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "42x20cm", 19, 29.99, 4),
  (27, "Aiguille de la Vanoise 4", "LIEN IMAGE", "L'aiguille de la Vanoise est un sommet de France, dans le massif de la Vanoise dominant Pralognan-la-Vanoise. Elle est réputée pour sa grande face nord de 300 à 400 m de haut.", "20x42cm", 14, 29.99, 4),
  (28, "Chamonix-Mont-Blanc 1", "LIEN IMAGE", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "42x20cm", 9, 32.50, 4),
  (29, "Chamonix-Mont-Blanc 2", "LIEN IMAGE", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "20x42cm", 5, 29.99, 4),
  (30, "Chamonix-Mont-Blanc 3", "LIEN IMAGE", "Chamonix-Mont-Blanc est une station de villégiature à la jonction de la France, de la Suisse et de l'Italie. Située au pied du Mont-Blanc, le plus haut sommet des Alpes, elle est réputée pour ses pistes de ski. Toute l'année, les téléphériques transportent les visiteurs vers les différents sommets environnants qui offrent des vues panoramiques exceptionnelles, comme l'Aiguille du Midi au-dessus de la ville et la Pointe Helbronner au-dessus des glaciers à la frontière italienne.", "42x20cm", 18, 29.99, 4),
  (31, "Col de la Vanoise", "LIEN IMAGE", "Le col de la Vanoise est un col des Alpes françaises situé à 2 517 mètres d'altitude dans le parc national de la Vanoise. Il permet l'accès entre les localités de Pralognan-la-Vanoise et Termignon, appartenant respectivement aux vallées de la Tarentaise et de la Maurienne, dans le département de la Savoie.", "42x20cm", 5, 34.99, 4),
  (32, "Lac des Vaches", "LIEN IMAGE", "Le lac des Vaches est un lac situé en France sur la commune de Pralognan-la-Vanoise, dans le département de la Savoie en région Auvergne-Rhône-Alpes. Il s'agit d'un lac de montagne du massif de la Vanoise et du parc national de la Vanoise, culminant à 2 318 mètres d'altitude.", "20x42cm", 8, 39.99, 4);



