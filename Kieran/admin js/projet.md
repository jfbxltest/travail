### Projet javascript prise de rendez-vous
le client détermine le planning (horaire, jours, etc.)
un utilisateur choisi et demande un rendez-vous
notification chez le client d'une demande de rendez-vous
confirmation de réception de demande de rendez-vous (chez l'utilisateur)
le client accepte (ou refuse) le rendez-vous
le planning est mis à jour
l'utilisateur est notifié de la confirmation (ou de l'impossibilité) du rendez-vous


## back-end
chaque site implémentant la gestion de prise de rendez-vous à une "api key" (clé d'access visible dans le JS ?!)

methodes 
 - public 
   - "get" : récupère les disponnibilités
   - "post" : soumet une requête de rendez-vous
 - protegé
   - "update" : enregistre (confirmation) un rendez-vous

