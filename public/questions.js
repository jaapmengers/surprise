questions = [
	new Question("Mw==", "Wat is de naam van de wetenschapper die na de ontploffing van de eerste atoombom de volgende woorden sprak: 'Now I am become Death, the destroyer of worlds'?", [{number: 1, answer: "Leslie Groves"}, {number: 2, answer: "J. Robert Oppenheimer", correct: true}, {number:3, answer: "Albert Einstein"}]),
	new Question("Nw==", "Op welk moment zend RTL 7 dit jaar het programma <i>Truck & Tractor Pulling</i> uit?", [{number: 1, answer: "Elke zondag om 15:30", correct: true}, {number: 2, answer: "Elke zaterdag om 13:00"}, {number:3, answer: "Tweewekelijks op zaterdag om 17:00"}]),
	new Question("MTI=", "Wie sprak als Juffrouw Jannie jarenlang de woorden 'Goeiesmorgens deze morgen'?", [{number: 1, answer: "Loes Haverkort"}, {number: 2, answer: "Anniek Pheifer"}, {number:3, answer: "Annet Malherbe", correct: true}]),
	new Question("MTc=", "Wie presenteerde van 1995 tot 1999 het programma <i>Uhhh... Vergeet Je Tandenborstel Niet!</i>?", [{number: 1, answer: "Jos Brink"}, {number: 2, answer: "Rolf Wouters", correct: true}, {number:3, answer: "Danny Rook"}]),
	new Question("MTQ=", "Wie presenteerde nooit Zomergasten?", [{number: 1, answer: "Adriaan van Dis"}, {number: 2, answer: "Joris Luyendijk"}, {number:3, answer: "Frenk van der Linden", correct: true}]),
	new Question("MTY=", "Welke twee Amerikaanse staten hebben per 1 januari 2014 het gebruik en de verkoop van cannabis volledig gelegaliseerd?", [{number: 1, answer: "Ohio en Delaware"}, {number: 2, answer: "Washington en Colorado", correct: true}, {number:3, answer: "Tennessee en Indiana"}]),
	new Question("MTU=", "In de verfilming van welk door Hunter S. Thompson geschreven boek spreekt Johhny Depp de woorden: 'Dogs fucked the pope, no fault of mine.'?", [{number: 1, answer: "Fear and Loathing in Las Vegas", correct: true}, {number: 2, answer: "Lock, Stock and Two Smoking Barrels"}, {number:3, answer: "Alice in Wonderland"}]),
	new Question("OQ==", "Wat is de naam van de band die in 1999 een hit scoorde met het nummer <i>The Road Ahead (Miles Of The Unknown)?</i>", [{number: 1, answer: "City To City", correct: true}, {number: 2, answer: "Admiral Freebee"}, {number:3, answer: "Alamo Race Track"}]),
	new Question("MTM=", "In 2011 verworf Museum Booijmans Van Beuningen het werk <i>De Pindakaasvloer</i>. Van wiens hand is dit kunstwerk?", [{number: 1, answer: "Jan Wolkers"}, {number: 2, answer: "Wim T. Schippers", correct: true}, {number:3, answer: "Erwin Olaf"}]),
	new Question("MTE=", "Wat is de naam van de omroepbaas die voorheen deel uitmaakte van het duo <i>Rembo & Rembo</i>?", [{number: 1, answer: "Theo Wesselo"}, {number: 2, answer: "Maxim Hartman", correct: true}, {number:3, answer: "Jan Slagter"}]),
	new Question("MTA=", "Vul aan: 'Niet meer bang voor m'n post of papieren / en ik ben nu dol op ...'?", [{number: 1, answer: "Ongewervelde dieren"}, {number: 2, answer: "Internetbankieren", correct: true}, {number:3, answer: "Hardhandig versieren"}]),
	new Question("NQ==", "What is the airspeed velocity of an unladen swallow?", [{number: 1, answer: "11 m/s"}, {number: 2, answer: "Dat is onbekend"}, {number:3, answer: "African or European swallow?", correct: true}]),
	new Question("MTg=", "Welke Nederlandse schrijver staat afgebeeld op het standbeeld op de kruising van de Singel en de Torensluis?", [{number: 1, answer: "Multatuli", correct: true}, {number: 2, answer: "Louis Couperus"}, {number:3, answer: "P.C. Boutens"}]),
	new Question("MTk=", "Wat is de eigenlijke naam van <i>The Tallest Man On Earth</i>?", [{number: 1, answer: "Rutger Gunnarsson"}, {number: 2, answer: "Olof Dreijer"}, {number:3, answer: "Kristian Matsson", correct: true}]),
	new Question("OA==", "Wie won in 2013 <i>Wie Is De Mol</i>?", [{number: 1, answer: "Paulien Cornelisse", correct: true}, {number: 2, answer: "Kees Tol"}, {number:3, answer: "Carolien Borgers"}]),
	new Question("MjA=", "Wie was ten tijde van oprichting naast Freek de Jonge het tweede lid van de cabaretgroep <i>Neerlands Hoop In Bange Dagen</i>?", [{number: 1, answer: "Bram Vermeulen", correct: true}, {number: 2, answer: "Jan de Hont"}, {number:3, answer: "Johan Gertenbach"}]),
	new Question("Ng==", "Onder welke pseudoniem maakten Arjen Lubach en Janine Abbring een parodie op het nummer Stan van Eminem ft. Dido?", [{number: 1, answer: "Slimme Schemer ft. Tido", correct: true}, {number: 2, answer: "Marcel Maartens ft. Pido"}, {number:3, answer: "Emmen-em ft. Guido"}]),
	new Question("MQ==", "Welk van mijn mancrushes vervulde de rol van Francis Underwood in de Netflix-originals serie <i>House of Cards</i>?", [{number: 1, answer: "Philip Seymour Hoffman"}, {number: 2, answer: "Bill Murray"}, {number:3, answer: "Kevin Spacey", correct: true}]),
	new Question("Mg==", "Eberhard van der Laan volgde Job Cohen in 2010 op als burgemeester van Amsterdam. Wie was Cohen's voorganger?", [{number: 1, answer: "Schelto Patijn", correct: true}, {number: 2, answer: "Ed van Thijn"}, {number:3, answer: "Jozias van Aartsen"}]),
	new Question("NA==", "Welk lid van de Red Hot Chilli Peppers had een rol als nihilist #2 in de Coen Brothers' <i>The Big Lebowski</i>?", [{number: 1, answer: "John Frusciante"}, {number: 2, answer: "Anthony Kiedis"}, {number:3, answer: "Flea", correct: true}])
]

function Question(number, question, answers){
  this.question = question;
  this.answers = answers;
  this.number = number;
}

getAnswerLetter = function(nr) {
	var letters = ['A', 'B', 'C'];
	return letters[nr-1];
}

resetQuestion = function(q){
	_.each(q.answers, function(it){
    it.selected = false;
  });
  return q;
}