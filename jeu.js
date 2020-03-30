let jeu = document.getElementById( 'jeu' ) ;

jeu.innerHTML = carte( 9 , 9 , 12 ) ;

function carte( longueur , largeur , bloques ) {
	const nbCases = longueur * largeur ;
	let nbBloques = bloques ;

	if( ( nbBloques / nbCases ) > 0.15 ) { 
		nbBloques = Math.trunc( 0.15 * nbCases ) 
	}
	let nbVides = nbCases - nbBloques ;

	const cases = [] ;
	for ( let i = 0 ; i < nbBloques ; i++ ) { 
		cases.push( 1 ) ; 
	}
	for ( let j = 0 ; j < nbVides ; j++ ) { 
		cases.push( 0 ) ; 
	}
	// console.log (cases);

	let tableau = new Array(largeur);
	for ( let j = 0 ; j < largeur ; j++ ) {

		tableau[j] = new Array(longueur);

		for ( let i = 0 ; i < longueur ; i++ ) {
			tableau[j][i] = selectionnerCases() ;
		}

	}
	// console.log (tableau);


	function selectionnerCases() {
		const numCase = Math.floor( Math.random( ) * cases.length ) ;
		//console.log(cases) ;
		//console.log(numCase + "/" + (cases.length-1)) ;
		const valeur = cases[ numCase ]
		cases.splice( numCase , 1 ) ;
		return valeur ;

	}

	function creer() {
		for(let i = 1; i <= largeur; i++) {
			for(let j = 1; j <= longueur; j++){

			}
		}
	}
	creer();


	return "<h1>Coucou</h1>";
}