questions = [
	new Question(1, "Welk van mijn mancrushes vervulde de rol van Francis Underwood in de Netflix-originals serie House of Cards?", [{number: 1, answer: "Philip Seymour Hoffman"}, {number: 2, answer: "Bill Murray"}, {number:3, answer: "Kevin Spacey", correct: true}]),
	new Question(2, "Eberhard van der Laan volgde Job Cohen in 2010 op als burgemeester van Amsterdam. Wie was Cohen's voorganger?", [{number: 1, answer: "Schelto Patijn", correct: true}, {number: 2, answer: "Ed van Thijn"}, {number:3, answer: "Jozias van Aartsen"}]),
	new Question(3, "Wat is de naam van de wetenschapper die na de ontploffing van de eerste atoombom de volgende woorden sprak: 'Now I am become Death, the destroyer of worlds'?", [{number: 1, answer: "Leslie Groves"}, {number: 2, answer: "J. Robert Oppenheimer", correct: true}, {number:3, answer: "Albert Einstein"}]),
	new Question(4, "Welk lid van de Red Hot Chilli Peppers had een rol als nihilist #2 in de Coen Brothers' The Big Lebowski?", [{number: 1, answer: "John Frusciante"}, {number: 2, answer: "Anthony Kiedis"}, {number:3, answer: "Flea", correct: true}]),
	new Question(5, "What is the airspeed velocity of an unladen swallow?", [{number: 1, answer: "11 m/s"}, {number: 2, answer: "Dat is onbekend"}, {number:3, answer: "African or European swallow?", correct: true}]),
	new Question(6, "Onder welke pseudoniem maakten Arjen Lubach en Janine Abbring een parodie op het nummer Stan van Eminem ft. Dido?", [{number: 1, answer: "Slimme Schemer ft. Tido", correct: true}, {number: 2, answer: "Marcel Maartens ft. Pido"}, {number:3, answer: "Emmen-em ft. Guido"}]),
	new Question(7, "Op welk moment zend RTL 7 dit jaar het programma 'Truck & Tractor Pulling' uit?", [{number: 1, answer: "Elke zondag om 15:30", correct: true}, {number: 2, answer: "Elke zaterdag om 13:00"}, {number:3, answer: "Tweewekelijks op zaterdag om 17:00"}]),
	new Question(8, "Wie won in 2013 Wie Is De Mol?", [{number: 1, answer: "Paulien Cornelisse", correct: true}, {number: 2, answer: "Kees Tol"}, {number:3, answer: "Carolien Borgers"}]),
	new Question(9, "Wat is de naam van de band die in 1999 een hit scoorde met het nummer The Road Ahead (Miles Of The Unknown)?", [{number: 1, answer: "City To City", correct: true}, {number: 2, answer: "Admiral Freebee"}, {number:3, answer: "Alamo Race Track"}]),
	new Question(10, "Vul aan: 'Niet meer bang voor m'n post of papieren / en ik ben nu dol op ...'?", [{number: 1, answer: "Ongewervelde dieren"}, {number: 2, answer: "Internetbankieren", correct: true}, {number:3, answer: "Hardhandig versieren"}]),
	new Question(11, "Wat is de naam van de omroepbaas die voorheen deel uitmaakte van het duo Rembo & Rembo?", [{number: 1, answer: "Theo Wesselo"}, {number: 2, answer: "Maxim Hartman", correct: true}, {number:3, answer: "Jan Slagter"}]),
	new Question(12, "Wie sprak als Juffrouw Jannie jarenlang de woorden 'Goeiesmorgens deze morgen'?", [{number: 1, answer: "Loes Haverkort"}, {number: 2, answer: "Anniek Pheifer"}, {number:3, answer: "Annet Malherbe", correct: true}]),
	new Question(13, "In 2011 verworf Museum Booijmans Van Beuningen het werk 'De Pindakaasvloer'. Van wiens hand is dit kunstwerk?", [{number: 1, answer: "Jan Wolkers"}, {number: 2, answer: "Wim T. Schippers", correct: true}, {number:3, answer: "Erwin Olaf"}]),
	new Question(14, "Wie presenteerde nooit Zomergasten?", [{number: 1, answer: "Adriaan van Dis"}, {number: 2, answer: "Joris Luyendijk"}, {number:3, answer: "Frenk van der Linden", correct: true}]),
	new Question(15, "In de verfilming van welk door Hunter S. Thompson geschreven boek spreekt Johhny Depp de woorden: 'Dogs fucked the pope, no fault of mine.'?", [{number: 1, answer: "Fear and Loathing in Las Vegas", correct: true}, {number: 2, answer: "Lock, Stock and Two Smoking Barrels"}, {number:3, answer: "Alice in Wonderland"}]),
	new Question(16, "Welke twee Amerikaanse staten hebben per 1 januari 2014 het gebruik en de verkoop van cannabis volledig gelegaliseerd?", [{number: 1, answer: "Ohio en Delaware"}, {number: 2, answer: "Washington en Colorado", correct: true}, {number:3, answer: "Tennessee en Indiana"}]),
	new Question(17, "Wie presenteerde van 1995 tot 1999 het programma 'Uhhh... Vergeet Je Tandenborstel Niet!'?", [{number: 1, answer: "Jos Brink"}, {number: 2, answer: "Rolf Wouters", correct: true}, {number:3, answer: "Danny Rook"}]),
	new Question(18, "Welke Nederlandse schrijver staat afgebeeld op het standbeeld op de kruising van de Singel en de Torensluis?", [{number: 1, answer: "Multatuli", correct: true}, {number: 2, answer: "Louis Couperus"}, {number:3, answer: "P.C. Boutens"}]),
	new Question(19, "Wat is de eigenlijke naam van The Tallest Man On Earth?", [{number: 1, answer: "Rutger Gunnarsson"}, {number: 2, answer: "Olof Dreijer"}, {number:3, answer: "Kristian Matsson", correct: true}]),
	new Question(20, "Wie was ten tijde van oprichting naast Freek de Jonge het tweede lid van de cabaretgroep 'Neerlands Hoop In Bange Dagen'?", [{number: 1, answer: "Bram Vermeulen", correct: true}, {number: 2, answer: "Jan de Hont"}, {number:3, answer: "Johan Gertenbach"}])
]



// for(var i = 0; i < 30; i++){
// 	questions.push(new Question(i, 'Hoe oud ben ik?', [{number: 1, answer:'18'}, {number: 2, answer: '20'}, {number: 3, answer: '26', correct: true}, {number: 4, answer: '30'}]));
// }

function Question(number, question, answers){
  this.question = question;
  this.answers = answers;
  this.number = number;
}