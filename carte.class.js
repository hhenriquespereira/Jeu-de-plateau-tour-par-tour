class Carte {
	constructor(longueur, hauteur) {
		this.longueur = longueur;
		this.hauteur = hauteur;
	}

	configurerCarte() {
		const map = new Array(this.hauteur)
		for(let y = 0 ; y < this.hauteur ; y++) {
			map[y] = new Array(this.longueur)
			for(let x = 0 ; x < this.longueur ; x++) {
				map[y][x] = 0
			}
		}
		//console.log(map);
		return map;
	}

	positionnerElement(map, valeur, bool, distance) {
		let x = Math.floor(Math.random() * this.longueur)
		let y = Math.floor(Math.random() * this.hauteur)
		while( !(map[y][x] == 0) || (bool && bool == true && this.verifierVoisins(map, x, y, distance, bool)) ) {
			x = Math.floor(Math.random() * this.longueur)
			y = Math.floor(Math.random() * this.hauteur)
		}
		map[y][x] = valeur
	}

	configurerMur() {
		return Math.ceil(0.13 * this.longueur * this.hauteur)
	}

	creerCarte(map) {
		const plateau = document.createElement("div");
		plateau.id = "plateau";
		for(let y = 0 ; y < this.hauteur ; y++) {
			const ligne = document.createElement("div");
			ligne.classList.add("lig");
			ligne.id = "lig-" + y;
			for(let x = 0 ; x < this.longueur ; x++) {
				const cellule = document.createElement("div");
				cellule.classList.add("cell");
				if(!(map[y][x] == 0)) {
					if(map[y][x] == 1) {
						cellule.classList.add("mur");
					}
					if(map[y][x] >= 10){
						cellule.classList.add("arme-" + map[y][x]);
					}
					if(map[y][x] == 2){
						cellule.classList.add("perso1");
					}
					if(map[y][x] == 3){
						cellule.classList.add("perso2");
					}
				}
				cellule.id = "cell" + x + "-" + y;
				ligne.appendChild(cellule);
			}
			plateau.appendChild(ligne);
		}
		return plateau;
	}

	verifierVoisins(map, x, y, distance, bool, booleen) {
		let control = false;
		//console.log(x + " - " + y)
		const plusX = this.verifierVoisinsAxe(map, x, y, 1, 0, distance, bool, booleen) // déplacement vers +x vers la droite
		const moinsX = this.verifierVoisinsAxe(map, x, y, -1, 0, distance, bool, booleen) // déplacement vers -x vers la gauche
		const plusY = this.verifierVoisinsAxe(map, x, y, 0, 1, distance, bool, booleen) // déplacement vers +y vers le bas
		const moinsY = this.verifierVoisinsAxe(map, x, y, 0, -1, distance, bool, booleen) // déplacement vers -y vers le haut

		if(bool && bool == true) {
			if(plusX || moinsX || plusY || moinsY) {
				control = true;
			}
		}
		return control;
	}

	verifierVoisinsAxe(map, x, y, dirX, dirY, distance, bool, booleen) {
		let control = false;
		for(let k = 1 ; k <= distance ; k++) {
			const posX = x + dirX * k;
			const posY = y + dirY * k;
			if (((0 > posX) || (0 > posY)) || ((posX >= longueur) || (posY >= hauteur))) { 
				break; 
			}
			else {

				if(!map[posY][posX] == 0) {
					console.log(k + " : " + posX + " - " + posY + " : " + map[posY][posX])
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

}