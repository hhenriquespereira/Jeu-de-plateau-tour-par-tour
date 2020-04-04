const longueur = 5;
const hauteur = longueur;
const mur = 20;



const arme = 1;
const typeArmeMin = 1;

const joueur = 2;

plateau(longueur, hauteur, mur, arme, typeArmeMin, joueur);




function plateau(longueur, hauteur, mur, nbArme, nbTypeArmeMin, joueur) {
	let jeu = document.getElementById('jeu');
	const configuration = configurerCarte(longueur, hauteur);
	const architecture = positionnerMur(configuration, longueur, hauteur, mur)
	const armurie = genererArme(nbArme, nbTypeArmeMin, joueur);
	const localisation = positionnerArmes(architecture, armurie, longueur, hauteur);
	const casting =  genererJoueur(joueur);
	const affectation = positionnerJoueurs(architecture, casting, longueur, hauteur);
	const creationCarte = creerCarte(affectation);
	jeu.appendChild(creationCarte);
}

function configurerCarte(longueur, hauteur) {
	const map = new Array(hauteur);
	for(let y = 0 ; y < hauteur ; y++) {
		map[y] = new Array(longueur);
		for(let x = 0 ; x < longueur ; x++) {
			map[y][x] = 0;
		}
	}
	console.log(map);
	return map;
}


function positionnerMur(map, longueur, hauteur, mur) {
	const nbCases = longueur * hauteur;
	let nbMur = mur;
	// Restreindre à 15% du total des cases
	if((nbMur / nbCases) > 0.15) { 
		nbMur = Math.trunc(0.15 * nbCases) 
	}
	positionnerElement(map, nbMur, longueur, hauteur, 1, true, 3);
	return map;
}

function creerCarte(map) {
	let plateau = document.createElement("div");
	plateau.id = "plateau";
	for(let y = 0 ; y < map.length ; y++) {
		let ligne = document.createElement("div");
		ligne.classList.add("ligne");
		ligne.id = "ligne-" + y;
		for(let x = 0 ; x < map[y].length ; x++) {
			let cellule = document.createElement("div");
			cellule.classList.add("cellule");
			if(!(map[y][x] == 0)) {
				if(map[y][x] == 1) {
					cellule.classList.add("mur");
				}
				if(map[y][x] >= 10 && map[y][x] <= 99){
					cellule.classList.add("arme-" + map[y][x]);
				}
				if(map[y][x] >= 100 && map[y][x] <= 199){
					cellule.classList.add("perso");
				}
			}
			cellule.id = "c" + x + "-" + y;
			ligne.appendChild(cellule);
		}
		plateau.appendChild(ligne);
	}
	return plateau;
}

function positionnerElement(map, nombre, longueur, hauteur, valeur, bool, distance) {
	for(let k = 0 ; k < nombre ; k++) { 
		let x = Math.floor(Math.random() * longueur) ,
		y = Math.floor(Math.random() * hauteur);
		while(!(map[y][x] == 0) || (bool && bool == true && verifierVoisins(map, x, y, distance, bool))) {
			x = Math.floor(Math.random() * longueur);
			y = Math.floor(Math.random() * hauteur);
		}
		map[y][x] = valeur;
	}
}

function verifierVoisins(map, x, y, distance, bool) {
	let control = false;
	//console.log(x + " - " + y)
	const plusX = verifierVoisinsAxe(map, x, y, 1, 0, distance, bool) // déplacement vers +x vers la droite
	const moinsX = verifierVoisinsAxe(map, x, y, -1, 0, distance, bool) // déplacement vers -x vers la gauche
	const plusY = verifierVoisinsAxe(map, x, y, 0, 1, distance, bool) // déplacement vers +y vers le bas
	const moinsY = verifierVoisinsAxe(map, x, y, 0, -1, distance, bool) // déplacement vers -y vers le haut

	if(bool && bool == true) {
		if(plusX || moinsX || plusY || moinsY) {
			control = true;
		}
	}
	return control;
}

function verifierVoisinsAxe(map, x, y, dirX, dirY, distance, bool) {
	let control = false;
	for(let k = 1 ; k <= distance ; k++) {
		const posX = x + dirX * k;
		const posY = y + dirY * k;
		if (((0 > posX) || (0 > posY)) || ((posX >= longueur) || (posY >= hauteur))) { 
			break; 
		}
		else if(!map[posY][posX] == 0) {
			control = true;
			break;
		}
		else {
			//console.log(k + " : " + posX + " - " + posY + " : " + map[posY][posX])
			//let toto = document.querySelector("#c"+(posX)+"-"+(posY));
			//toto.classList.add("acces");

		}
	}
	return control;
}




function genererArme(nbArme, nbTypeArmeMin, joueur) {
	class Arme {
		constructor(nom, points, nombre) {
			this.nom = nom;
			this.points = points;
			this.nombre = nombre;
		}
	}

	let nbType = nbArme + 1;
	if(nbType <= nbTypeArmeMin) { nbType = nbTypeArmeMin; }
	const armurie = new Array(nbType);
	for(let l = 0 ; l < nbType ; l++) {
		const points = 2* l + 10 ;
		let nombre = 1;
		if(l == 0) { nombre = joueur; }
		armurie[l] = new Arme("Arme " + (l + 1), points, nombre);
	}
	console.log(armurie);
	return armurie;
}

function positionnerArmes(map, armurie, longueur, hauteur) {
	for(let k = 1 ; k < armurie.length ; k++) {
		positionnerElement(map, armurie[k].nombre, longueur, hauteur, armurie[k].points, true, 2);
	}
	return map;
}

function genererJoueur(joueur) {
	class Joueur {
		constructor(id, nom, points = 100) {
			this.nom = nom;
			this.id = id;
			this.points = points;
		}
	}

	const annuaire = new Array(joueur);
	for(let l = 0 ; l < joueur ; l++) {
		annuaire[l] = new Joueur((100 + l), "Toto " + (l + 1));
	}
	console.log(annuaire);
	return annuaire;

}

function positionnerJoueurs(map, annuaire, longueur, hauteur) {
	for(let k = 0 ; k < annuaire.length ; k++) {
		positionnerElement(map, 1, longueur, hauteur, annuaire[k].id, true, 1);
	}
	return map;
}

