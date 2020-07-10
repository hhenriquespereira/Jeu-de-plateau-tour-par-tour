class Carte {
	constructor(longueur, hauteur){
		this.longueur=(longueur<4)?4:longueur
		this.hauteur=(hauteur<4)?4:hauteur
		this.surface=this.longueur*this.hauteur
		this.mur=Math.ceil(0.13*this.surface)
		this.nbArmeCarte=Math.ceil(0.04*this.surface)
		this.nbTypeArmeMin=Math.ceil(0.04*this.surface)
		this.map=this.configurerCarte()
		this.configurerTypeArme=((this.nbArmeCarte+1)<this.nbTypeArmeMin)?this.cnbTypeArmeMin-1:this.nbArmeCarte
		this.armurie=new Array()
		this.casting=new Array(new Joueur(`Mario`), new Joueur(`Luigi`))
	}

	getMap(x, y){
		return this.map[y][x]
	}

	setMap(x, y, value){
		this.map[y][x]=value
	}

	configurerCarte(){
		const map=new Array(this.hauteur)
		for(let y=0; y<this.hauteur; y++){
			map[y]=new Array(this.longueur)
			for(let x=0; x<this.longueur; x++){
				map[y][x]=0
			}
		}
		return map
	}

	positionnerElement(valeur, bool, distance){
		let x, y
		do {
			x=aleatoire(this.longueur)
			y=aleatoire(this.hauteur)
		}
		while(!(this.getMap(x, y)==0)||(bool && bool==true && this.verifierVoisins(x, y, distance)))
		this.setMap(x, y, valeur)
	}

	initialiserMur(){
		for(let k=0; k<this.mur; k++){
			this.positionnerElement(new Mur(), true, 3)
		}		
	}

	genererArme(){
		for(let l=0; l<this.configurerTypeArme; l++){
			const points=12+2*l
			const arme=new Arme(`Arme à ${points}pts`, points)
			this.armurie.push(arme)
		}
	}

	initialiserArme(){
		this.genererArme()
		for(let k=0; k<this.armurie.length; k++){
			this.positionnerElement(this.armurie[k], true, 1)
		}
	}

	initialiserJoueur(){
		for(let k=0; k<this.casting.length; k++){
			this.positionnerElement(this.casting[k], true, 1)
			$(`#logo${k}`).attr(`src`, `./img/joueur${k}.png`)
			$(`#nom${k}`).append(this.casting[k].getNom())
			$(`#points${k}`).append(`${this.casting[k].getPoints()} points de vie`)
			$(`#arme${k}`).append(this.casting[k].getArmeNom())
			$(`#arme-${k}`).attr(`src`, `./img/arme-${this.casting[k].getArmePoints()}.png`)
		}
	}

	genererCarte(){
		const jeu=$(`#jeu`)
		const plateau=$(`<table></table>`).attr(`id`, `carte`).css({minWidth: `${(Math.floor((600-2*16)/this.longueur)* this.longueur+2*16)}px`})
		for(let y=0; y<this.hauteur; y++){
			const ligne=$(`<tr></tr>`).addClass(`lig`).attr(`id`, `lig-${y}`)
			for(let x=0; x<this.longueur; x++){
				const cellule=$(`<td></td>`).css({width: `${Math.floor((600-2*16-4*this.longueur)/this.longueur)}px`, height: `${Math.floor((600-2*16-4*this.longueur)/this.longueur)}px`}).addClass(`cell`).attr(`id`, `cell${x}-${y}`).attr(`data-x`, x).attr(`data-y`, y)
				switch(this.getMap(x, y).constructor.name){
					case `Mur` :
						cellule.addClass(`mur`)
					break;
					case `Arme` :
						cellule.addClass(`arme`).css({backgroundImage: `url('./img/arme-${this.getMap(x, y).getPoints()}.png')`})
					break;
					case `Joueur` :
						cellule.addClass(`joueur${this.casting.indexOf(this.getMap(x, y))}`).css({backgroundImage: `url('./img/joueur${this.casting.indexOf(this.getMap(x, y))}.png')`})
					break;
				}
				ligne.append(cellule)
			}
			plateau.append(ligne)
		}
		jeu.empty().append(plateau)
	}

	initialiserCarte(){
		this.initialiserMur()
		this.initialiserArme()
		this.initialiserJoueur()
		this.genererCarte()
	}

	verifierVoisins(x, y, distance, acces){
		const plusX=this.verifierVoisinsAxe(x, y, `droite`, distance, acces), // déplacement vers +x vers la droite
		moinsX=this.verifierVoisinsAxe(x, y, `gauche`, distance, acces), // déplacement vers -x vers la gauche
		plusY=this.verifierVoisinsAxe(x, y, `bas`, distance, acces), // déplacement vers +y vers le bas
		moinsY=this.verifierVoisinsAxe(x, y, `haut`, distance, acces)// déplacement vers -y vers le haut
		
		let control=false
		if(plusX||moinsX||plusY||moinsY){ 
			control=true
		}
		return control
	}

	verifierVoisinsAxe(x, y, direction, distance, acces){
		let control=false, dirX, dirY
		switch(direction){
			case `droite` : dirX=1, 	dirY=0
			break
			case `gauche` : dirX=-1, 	dirY=0
			break
			case `bas` : 	dirX=0, 	dirY=1
			break
			case `haut` : 	dirX=0, 	dirY=-1
			break
		}
		for(let k=1; k <=distance; k++){
			const posX=x+dirX*k, posY=y+dirY*k
			if(((0>posX)||(0>posY))||((posX>=this.longueur)||(posY>=this.hauteur))){ 
				break 
			}
			else {
				if(!this.getMap(posX, posY)==0){
					control=true
					break
				}
			}
		}
		if(acces && acces==true){
			$(`#cell${x}-${y}`).addClass(`select`)
			for(let k=1; k <=distance; k++){
				const posX=x+dirX*k, posY=y+dirY*k
				if(((0>posX)||(0>posY))||((posX>=this.longueur)||(posY>=this.hauteur))){ 
					break 
				}
				else {
					if((this.getMap(posX, posY)==0)||(this.getMap(posX, posY).constructor.name==`Arme`)){
						$(`#cell${posX}-${posY}`).addClass(`acces`)
					}
					else {
						break
					}
				}
			}
		}
		return control
	}
}