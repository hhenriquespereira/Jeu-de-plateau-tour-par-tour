class Joueur {
	constructor(nom) {
		this.nom=nom
		this.points=100
		this.arme=new Arme(`Arme à 10pts`, 10)
		this.cellule=0
		this.facteur=1
	}
	
	getNom() {
		return this.nom
	}

	getPoints() {
		return this.points
	}

	setPoints(value) {
		this.points=value
	}

	haveDegats(value) {
		this.points-=value
	}

	getArme() {
		return this.arme
	}

	setArme(value) {
		this.arme=value
	}

	getArmeNom() {
		return this.arme.getNom()
	}

	getArmePoints() {
		return this.arme.getPoints()
	}

	getCellule() {
		return this.cellule
	}

	setCellule(value) {
		this.cellule=value
	}

	getFacteur() {
		return this.facteur
	}

	setFacteur(value) {
		this.facteur=value
	}
}
