const mijnOpgave = document.getElementById("mijnOpgave");
const mijnAntwoord = document.getElementById("mijnAntwoord");
const mijnEvaluatie = document.getElementById("mijnEvaluatie");
const myImage = document.getElementById("myImage");

const makkelijk = document.getElementById("makkelijk");
const gemiddeld = document.getElementById("gemiddeld");
const moeilijk = document.getElementById("moeilijk");


//NEGEER DIT!!!
/*Geeft een niveau aan
niveau = 1;

makkelijk.addEventListener("click", function(){
	console.log("Makkelijk");
	niveau = 1;
});
gemiddeld.addEventListener("click", function(){
	console.log("Gemiddeld");
	niveau = 2;
	
});
moeilijk.addEventListener("click", function(){
	console.log("Moeilijk");
	niveau = 3;
});*/


//verbergt de evaluatie
mijnEvaluatie.style.display = "none";
let sommen = [];
let teller = 0;



//maakt een som
function maakSom(){
let mijnSom = {};
mijnSom.getalA = maakGetal();
mijnSom.getalB = maakGetal();
mijnSom.goedeAntwoord = mijnSom.getalA * mijnSom.getalB;
return mijnSom;
}


//maakt een willekeurig getal
function maakGetal(){
	return Math.floor(Math.random()*9) + 1;
}

//10 sommen in totaal
for(let i = 0; i < 10; i++){
	sommen.push(maakSom());
}



//tabel maakt gebruik van de teller
function keyHandler(evt){
	if(evt.keyCode == 13){
		sommen[teller].mijnAntwoord = mijnAntwoord.value;
		controleerAntwoord();
		teller++;
		if(teller >= sommen.length){
			afsluiten();
		} else{
			mijnAntwoord.value = "";
			mijnOpgave.innerHTML = sommen[teller].getalA + " X " + sommen[teller].getalB;
			window.setTimeout(waiting, 3000);
		}
		
		console.log(sommen);
	}
	
}

function controleerAntwoord(){
	console.log(sommen[teller].goedeAntwoord);
	if(sommen[teller].mijnAntwoord == sommen[teller].goedeAntwoord){
			new Audio('goed.mp3').play();
			myImage.src = "goed.gif";
			console.log("Het antwoord is correct.");
			//document.body.style.backgroundImage = "url('goedBackground.gif')";
			
		
		} else{
			new Audio('fout.mp3').play();
			myImage.src = "fout.gif";
			console.log("Het antwoord is fout.");
			//document.body.style.backgroundImage = "url('foutBackground.gif')";

			
		}
}

//het spel aflsuiten
function afsluiten(){
	alert('Je hebt het rekenspel afgerond');
	mijnEvaluatie.style.display = "block";
	myImage.src = "";
	document.body.style.backgroundImage = "none";
	
	// Een tabel maken -Header- 
	let myTable = document.createElement('table');
	myTable.setAttribute('border', 1);
	let row = myTable.insertRow();
	let header1  = row.insertCell();
	let header2 = row.insertCell();
	let header3 = row.insertCell();
	header1.innerHTML = "De sommen: ";
	header2.innerHTML = "Goede antwoorden: ";
	header3.innerHTML = "Jouw antwoorden: ";
	
	//Een tabel maken (cellen)
	for(let i = 0; i<sommen.length; i++){
			let row2 = myTable.insertRow();
			let cell1 = row2.insertCell();
			let cell2 = row2.insertCell();
			let cell3 = row2.insertCell();
			cell1.innerHTML = sommen[i].getalA + " X " + sommen[i].getalB; 
			cell2.innerHTML = sommen[i].goedeAntwoord;
			cell3.innerHTML = sommen[i].mijnAntwoord;
			if(sommen[i].goedeAntwoord == sommen[i].mijnAntwoord){
			cell3.style.backgroundColor = "lime";
			} else{
				cell3.style.backgroundColor = "red";
			}
	}	
	
	mijnEvaluatie.appendChild(myTable);
	
}


mijnAntwoord.focus();
mijnOpgave.innerHTML = sommen[0].getalA + " X " + sommen[0].getalB;
mijnAntwoord.addEventListener('keyup', keyHandler);



function waiting(){
	myImage.src = "";
	//document.body.style.backgroundImage = "url('')";
	document.body.style.backgroundColor = "#000";
	
}