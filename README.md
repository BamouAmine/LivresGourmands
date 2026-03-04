# LivresGourmands
LivresGourmands est une plateforme de commerce électronique spécialisée dans la vente de livres de cuisine. 
. Elle vise à servir un public large, allant des cuisiniers amateurs aux chefs professionnels. Le site se distingue par des fonctionnalités sociales comme les listes de cadeaux, un système d'avis clients modéré pour garantir la pertinence, et un tunnel d'achat sécurisé externalisé.
L'objectif de cette première phase est de poser les bases sémantiques et structurelles du projet :
1.	Analyser les besoins décrits dans le cahier des charges.
2.	Modéliser les interactions des différents utilisateurs avec le système.
3.	Concevoir l'architecture des classes orientée objet qui soutiendra le développement technique.
1.2 Objectifs 
•	Modéliser les interactions entre les utilisateurs et le système.
•	Concevoir l'architecture de données orientée objet.
•	Définir les règles métier et le stack technologique.
________________________________________
2. ANALYSE FONCTIONNELLE (CAS D’UTILISATION)
2.1 Description des Acteurs
•	Internaute : Visiteur anonyme (recherche, consultation).
•	Client : Utilisateur authentifié (commande, panier, liste cadeaux).
•	Ami : Tiers utilisant un code cadeau pour offrir un ouvrage.
•	Éditeur : Responsable du contenu et de la modération.
•	Gestionnaire : Responsable du catalogue et des stocks.
•	Administrateur : Responsable technique et gestion des accès.
2.2 Scénario Utilisateur (Client) : "Passer une commande"
•	Précondition : Le client est connecté et possède des articles au panier.
1.	Le client accède au récapitulatif de commande.
2.	Le système vérifie la disponibilité réelle en stock.
3.	Le client sélectionne l'adresse de livraison.
4.	Le système calcule les taxes (TPS/TVQ) et frais d'expédition.
5.	Le client est redirigé vers l'interface de paiement externe.
6.	Succès : Le stock est décrémenté, le panier vidé, et un courriel est envoyé.
	________________________________________
3. Environnement de développement
•	Frontend : React (SPA) pour une navigation fluide.
•	Backend : Node.js avec Express pour l'API REST.
•	Base de données : MySQL (Relationnelle).
•	Authentification : JWT (JSON Web Tokens) et Bcrypt.
