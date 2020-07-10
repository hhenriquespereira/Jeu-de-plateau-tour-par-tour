class Jeu {
	constructor(longueur, hauteur){
		this.carte=new Carte(longueur, hauteur)
		this.lancerJeu()
	}

	getCarte(){
		return this.carte
	}

	getMap(){
		return this.carte.map
	}

	getMapCoor(x, y){
		return this.carte.map[y][x]
	}

	setMapCoor(x, y, value){
		this.carte.map[y][x]=value
	}

	getLongueur(){
		return this.carte.longueur
	}

	getHauteur(){
		return this.carte.hauteur
	}

	getCasting(){
		return this.carte.casting
	}

	getNbJoueur(){
		return this.carte.casting.length
	}

	getJoueur(value){
		return this.carte.casting[value]
	}

	getCeJoueur(value){
		return(this.carte.casting.indexOf(value))
	}

	getAutreJoueur(value){
		return(this.carte.casting.indexOf(value)+ 1)% this.carte.casting.length
	}

	lancerJeu(){
		console.log(`Lancer le Jeu`)
		this.getCarte().initialiserCarte()
		this.trouverJoueur(this.getJoueur(aleatoire(this.getNbJoueur())))	
	}

	trouverJoueur(select){
		let xp, yp
		for(let y=0; y<this.getHauteur(); y++){
			for(let x=0; x<this.getLongueur(); x++){
				if(this.getMapCoor(x, y)==select){
					this.getCarte().verifierVoisins(x, y, 3, true)
					xp=x, yp=y
					$(`#joueur${this.getCeJoueur(select)}`).addClass(`active`)
				}
			}
		}
		const acces=$(`.acces`)
		const self=this
		for(let i=0; i<acces.length; i++){
			acces[i].addEventListener('click', function(){
				self.deplacerJoueur(select, acces[i].dataset.x, acces[i].dataset.y, xp, yp)
			})
		}
	}

	deplacerJoueur(select, x, y, xp, yp){
		this.setMapCoor(xp, yp, select.getCellule())
		select.setCellule(this.getMapCoor(x, y))
		this.echangerArme(select, x, y)
		this.setMapCoor(x, y, select)
		this.getCarte().genererCarte()
		$(`#joueur${this.getCeJoueur(select)}`).removeClass(`active`)
		if(this.distanceJoueur()==1){
			console.log(`Un combat à mort s’engage !`)
			this.combattreJoueur(select)
		}
		else {
			this.trouverJoueur(this.getJoueur(this.getAutreJoueur(select)))
		}
	}

	echangerArme(select, x, y){
		if(this.getMapCoor(x, y).constructor.name==`Arme`){
			if(select.getArmePoints()<this.getMapCoor(x, y).getPoints()){
				select.setCellule(select.getArme())
				console.log(`${select.getNom()} a échangé son "${select.getArmeNom()}" avec une "${this.getMapCoor(x, y).getNom()}" !`)
				select.setArme(this.getMapCoor(x, y))
				$(`#arme${this.getCeJoueur(select)}`).empty().append(select.getArmeNom())
				$(`#arme-${this.getCeJoueur(select)}`).attr(`src`, `./img/arme-${select.getArmePoints()}.png`)
			}
		}
	}

	distanceJoueur(){
		let xA, yA, xB, yB
		for(let y=0; y<this.getHauteur(); y++){
			for(let x=0; x<this.getLongueur(); x++){
				if(this.getMapCoor(x, y)==this.getJoueur(0)){
					xA=x, yA=y
				}
				if(this.getMapCoor(x, y)==this.getJoueur(1)){
					xB=x, yB=y
				}
			}
		}
		//ES7
		return Math.sqrt((yB-yA)**2+(xB-xA)**2)
	}

	combattreJoueur(select){
		let meneur=select
		let receveur=this.getJoueur(this.getAutreJoueur(meneur))

		$(`#joueur${this.getCeJoueur(meneur)}`).addClass(`active`)
		$(`.joueur${this.getCeJoueur(meneur)}`).addClass(`select`)

		function creerButton(nom, id){
			return $(`<button type="submit"></button>`).attr(`id`, id).addClass(`btn btn-primary btn-lg btn-block`).html(nom)
		}

		const attaquer=creerButton(`Attaquer`, `attaquer`)
		const seDefendre=creerButton(`Se défendre`, `seDefendre`)

		const inter=$(`#inter`).empty()

		if(meneur.getPoints()>=0 || receveur.getPoints()>=0){
			inter.append(attaquer).append(seDefendre)

			const self=this
			
			attaquer.bind('click', function(){
				self.attaquerJoueur(meneur, receveur)
				$(`#joueur${self.getCeJoueur(meneur)}`).removeClass(`active`)
				$(`.joueur${self.getCeJoueur(meneur)}`).removeClass(`select`)
				self.combattreJoueur(receveur)
			})

			seDefendre.bind('click', function(){
				self.seDefendreJoueur(meneur, receveur)
				$(`#joueur${self.getCeJoueur(meneur)}`).removeClass(`active`)
				$(`.joueur${self.getCeJoueur(meneur)}`).removeClass(`select`)
				self.combattreJoueur(receveur)
			})
		}
		
	}

	attaquerJoueur(meneur, receveur){
		if(!(meneur.getPoints()==0 || receveur.getPoints()==0)){
			const degats=Math.floor(receveur.getFacteur()*meneur.getArmePoints())
			receveur.haveDegats(degats)
			$(`#points${this.getCeJoueur(receveur)}`).empty().append(`${receveur.getPoints()} points de vie`)

			if(receveur.getPoints()<=0){ 
				receveur.setPoints(0)
				$(`#message`).empty().append(`${meneur.getNom()} a tué ${receveur.getNom()}.`)
				alert(`${meneur.getNom()} a tué ${receveur.getNom()}.\n\nEn route pour une nouvelle partie !`)
				location.reload()
			}
			else {
				$(`#message`).empty().append(`Attaque de ${meneur.getNom()} sur ${receveur.getNom()} avec une arme de ${degats} points de dégâts.`)
			}			
		}
		receveur.setFacteur(1)
	}

	seDefendreJoueur(meneur, receveur){
		if(!(meneur.getPoints()==0 || receveur.getPoints()==0)){
			$(`#message`).empty().append(`Défense de ${meneur.getNom()} par rapport à ${receveur.getNom()}`)
		}
		meneur.setFacteur(.5)
	}
}
