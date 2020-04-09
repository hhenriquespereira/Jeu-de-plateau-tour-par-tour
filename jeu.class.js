class Jeu {
	constructor(carte, armurie, casting) {
		this.carte = carte
		this.armurie = armurie
		this.casting = casting
		//console.log(this.armurie)
		//console.log(this.casting)
		//console.log(this.armurie.length)
		//console.log(this.casting.length)
	}

	lancerJeu() {
		console.log("Lancer le Jeu")
		this.initialiserJeu()

	}

	initialiserJeu() {
		const map = this.carte.configurerCarte()
		for(let k = 0 ; k < this.carte.configurerMur() ; k++) {
			this.carte.positionnerElement(map, 1, true, 3) 

		}
		
		genererArme(nbType)
		for(let k = 0 ; k < this.armurie.length ; k++) {
			this.carte.positionnerElement(map, this.armurie[k].points, true, 2)
		}

		//console.log(this.casting)
		genererJoueur(nbJoueur)
		for(let k = 0 ; k < this.casting.length ; k++) {
			this.carte.positionnerElement(map, this.casting[k].id, true, 1)
		}

		const carte = this.carte.creerCarte(map)

		const jeu = document.getElementById("jeu")
		jeu.appendChild(carte)

		this.carte.verifierVoisins(map, 4, 5, 3, true, true)
		
	}
}