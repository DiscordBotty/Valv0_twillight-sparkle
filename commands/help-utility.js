module.exports = {
  name: 'help-utility',
	description: 'page d aide',
    execute(message, args) {
      message.channel.send('_serverinfo : Permet de voir les informations du serveur.\n_optiwork: montre le niveau de sécurité de botty sur une échelle de critères. \n_ping: donne votre ping en ms.\n_serverlist : afficher la liste des serveurs qui font confiance à botty.\n_userinfo {mention}: donne des info sur le membre mentionné.\n_finduser {ID}: vérifie si l ID est bien attaché à un membre de discord.\n_getserverinvite {id du serveur}: génère une invitation temporaire via l ID vers le serveur donné\n_getuserinfo {ID}: version amélioré de `_userinfo`. \n *info: savoir quel rank tu es.')
      console.log("help utilitaire reçu!")
    },
};