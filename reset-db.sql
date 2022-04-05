DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`(
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(255) NOT NULL
);




DROP TABLE IF EXISTS `character`;
CREATE TABLE `character` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `age` INT NOT NULL,
	`image`VARCHAR(200) NOT NULL,
	`description` TEXT NOT NULL,
     PRIMARY KEY (`id`));

INSERT INTO
  `characters` (name, age, image, description)
VALUES
(
  "Carl ingram", 
  66, 
  "https://static.wikia.nocookie.net/hitman/images/9/90/HITMAN%E2%84%A2_III_Personnage_Carl_Ingram.webp/revision/latest/scale-to-width-down/350?cb=20210525192104&path-prefix=fr",
  "Carl Ingram était le patriarche de la famille Ingram et l'un des partenaires de Providence.
Il est actuellement à la tête de l'empire familial et le deuxième partenaire principal de Providence.
 Carl est un homme impertinent, direct et cow-boy dans l'âme.
Malgré son immense fortune et ses privilèges, la famille Ingram a toujours entretenu une éthique de travail protestante,
et Carl adore passer du temps dans son ranch au Kansas ou à se promener dans ses champs pétrolifères.
C'est d'ailleurs là-bas qu'il emmène ses partenaires commerciaux et acolytes politiques pour les jauger.
Carl est un homme fougueux, aux airs dominants et à la poigne d'acier. 
Il est très intelligent, perspicace et capable d'analyser précisément le caractère des gens."),
(
  "Marcus Stuyvesant",
51,
"https://static.wikia.nocookie.net/hitman/images/0/09/HITMAN%E2%84%A2_III_Personnage_Marcus_Stuyvesant.webp/revision/latest/scale-to-width-down/350?cb=20210526074644&path-prefix=fr",
"Marcus Stuyvesant était le patriarche de la famille Stuyvesant et l'un des partenaires de Providence 
actuellement à la tête de l'empire familial, est le plus jeune des partenaires de Providence.
Il est divorcé de Penelope Huxley-Stuyvesant,
avec qui il a eu une fille unique, Cornelia, qui dirige la fondation d'art Stuyvesant."),
(
  "Alexa Christine",
75,
"https://static.wikia.nocookie.net/hitman/images/4/46/HITMAN%E2%84%A2_III_Alexa_Christine_Carlisle.webp/revision/latest/scale-to-width-down/350?cb=20210518092631&path-prefix=fr",
"Alexa Christine Carlisle aussi connue comme Madame Carlisle était la matriarche de la famille Carlisle et l'une des trois partenaire de Providence
actuelle régente de la famille, est la partenaire de Providence la plus âgée et la cheffe non officielle de cette cabale de pouvoir. Froide comme la glace, plus tranchante qu'un rasoir, Alexa inspire la royauté, la fierté et la dignité, et profite de son statut pour afficher une rudesse que nulle n'ose réprouver.
Alexa fut autrefois mariée à un officier de la marine aristocrate, Lyndon James Wittingworth, avec qui elle eut trois enfants : Gregory, Edward et Rebecca. Lyndon, alors alcoolique notoire, mourut dans un accident de voiture en 1978, après quoi Alexa ne se remaria plus jamais.")

("Olivia Hall",
26,
 "https://static.wikia.nocookie.net/hitman/images/6/61/HITMAN%E2%84%A2_III_Personnage_Olivia_Hall.webp/revision/latest?cb=20210518103451&path-prefix=fr",
 "Olivia Hall est une hackeuse, alliée la plus proche de Lucas Grey dans son combat contre Providence. Olivia aida, à contrecoeur, 47 à retrouver la trace d'Arthur Edwards "
 );
 (
   "Hush",
   "https://static.wikia.nocookie.net/hitman/images/6/6f/HITMAN%E2%84%A2_III_Personnage_Hush.webp/revision/latest?cb=20210507192250&path-prefix=fr",
   "Hush est un spécialiste cybersécurité travaillant pour l'ICA, le vrai nom et l'identité de Hush ne sont jamais donnés, ni supposés. Hush sais cacher ses traces. "
 )  

DROP TABLE IF EXISTS `mission`;
CREATE TABLE `mission` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
	  `image`VARCHAR(200) NOT NULL,
	  `description` TEXT NOT NULL,
     PRIMARY KEY (`id`));

INSERT INTO
  `mission` (name, location, image, description)
VALUES
(
  "Sur le toit du monde", 
"Dubaï", 
"https://i.ibb.co/fS65v7F/HITMAN-III-Mission-Sur-le-toit-du-monde.webp", 
"Sur le Toit du Monde est la première mission de HITMAN™ III dans laquelle l'agent 47 doit éliminer Carl Ingram et Marcus Stuyvesant, deux des trois partenaires de Providence.")
(
  "Mort dans la Famille",
 "Angleterre Dartmoor",
"https://i.ibb.co/ftMLm9X/HITMAN-III-Destination-Dartmoor.webp",
"Mort dans la Famille est la deuxième mission de HITMAN™ III dans laquelle l'agent 47 doit éliminer Alexa Carlisle, la troisième et dernière des Partenaires de Providence en plus d'acquérir des informations sur Arthur Edwards.")
(
  "Prédateur Perché",
  "	Berlin",
  "https://i.ibb.co/dQpBht1/Centrale-nucl-aire-de-Berlin.webp",
  "Prédateur Perché est la troisième mission de HITMAN™ III dans laquelle l'agent 47 doit éliminer cinq agents de l'ICA, envoyés pour tuer Olivia Hall, à leur point de rendez-vous, à Berlin en Allemagne."
)
(
 "Fin d'une Ère",
 "Chongping",
 "https://i.ibb.co/kyVXbBb/Fond-Chongqing.webp",
 "Fin d'une Ère est la quatrième mission de HITMAN™ III dans laquelle l'agent 47 doit éliminer Hush et Imogen Royce. Il doit en plus, pirater le cœur de données pour supprimer définitivement tous les fichiers de l'ICA."
);
