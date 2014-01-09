questions = new Array();
for(var i = 0; i < 30; i++){
  questions.push(new Question(i, 'Hoe oud ben ik?', [{number: 1, answer:'18'}, {number: 2, answer: '20'}, {number: 3, answer: '26', correct: true}, {number: 4, answer: '30'}]));
}

questionsLeft = questions.map(function(q){
  return q.number;
});

function Question(number, question, answers){
  this.question = question;
  this.answers = answers;
  this.number = number;
}