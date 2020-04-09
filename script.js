const longueur = 10 // prompt
const hauteur = 9 // prompt
const nbArme = 4 // prompt
const nbTypeArmeMin = 4 // prompt
let nbType = nbArme + 1
if(nbType < nbTypeArmeMin) { 
	nbType = nbTypeArmeMin - 1 
}
else { 
	nbType-- 
}

const nbJoueur = 2



/* --------------------------------------------------- */
const CARTE = new Carte(longueur, hauteur)
const ARMURIE = new Array()
const CASTING = new Array()

const JEU = new Jeu(CARTE, ARMURIE, CASTING)

JEU.lancerJeu()
/* --------------------------------------------------- */

function genererArme(nbType) {
	for(let l = 0 ; l < nbType ; l++) {
		const points = 12 + 2 * l ;
		ARMURIE.push(new Arme("Arme à " + points + "pts", points));
	}
	return ARMURIE
}

function genererJoueur(nbJoueur) {
	for(let l = 0 ; l < nbJoueur ; l++) {
		const arme = new Arme("Arme à 10pts", 10)
		//ARMURIE.push(arme)
		CASTING.push(new Joueur("Joueur " + (l + 1), (2 + l), arme))
	}
	return CASTING
}
console.log("i")
console.log(CARTE.configurerCarte())
console.log("i")

CARTE.verifierVoisins(JEU.carte.configurerCarte(), 4, 5, 3, true, true)
/*
function verifierVoisins(map, x, y, distance, bool, booleen) {
	let control = false;
	//console.log(x + " - " + y)
	const plusX = verifierVoisinsAxe(map, x, y, 1, 0, distance, bool, booleen) // déplacement vers +x vers la droite
	const moinsX = verifierVoisinsAxe(map, x, y, -1, 0, distance, bool, booleen) // déplacement vers -x vers la gauche
	const plusY = verifierVoisinsAxe(map, x, y, 0, 1, distance, bool, booleen) // déplacement vers +y vers le bas
	const moinsY = verifierVoisinsAxe(map, x, y, 0, -1, distance, bool, booleen) // déplacement vers -y vers le haut

	if(bool && bool == true) {
		if(plusX || moinsX || plusY || moinsY) {
			control = true;
		}
	}
	return control;
}

function verifierVoisinsAxe(map, x, y, dirX, dirY, distance, bool, booleen) {
	let control = false;
	for(let k = 1 ; k <= distance ; k++) {
		const posX = x + dirX * k;
		const posY = y + dirY * k;
		if (((0 > posX) || (0 > posY)) || ((posX >= longueur) || (posY >= hauteur))) { 
			break; 
		}
		else {

			if(!map[posY][posX] == 0) {
				control = true;
				break;
			}
			else {
				
				if (booleen && booleen == true) {
					console.log(k + " : " + posX + " - " + posY + " : " + map[posY][posX])
					let toto = document.querySelector("#cell"+(posX)+"-"+(posY));
					toto.classList.add("acces");
				}
			}
			
		}
	}
	return control;
}
*/