function Tile(number){
  this.number = number;
  this.enabled = true;
}

function Question(number, q, answers){
  this.number = number;
  this.question = q;
  this.answers = answers;
}

function Round(question){
  this.question = question;
}

if (Meteor.isClient) {

  // if(Tiles.find().count() < 1){
  //   console.log("Inserting tiles");
  //   for(var i=0; i < 12; i++){
  //     Tiles.insert(new Tile(i))
  //   }
  // }

  Template.currentTile = function(){
    return currentTile;
  };

  Template.tiles.getTiles = function(){
    return Tiles.find();
  }

  Template.tiles.events({
    'click': function () {
      Tiles.update(this._id, {$set: {enabled: !this.enabled}});
      Meteor.call('updateCurrentTile', this.number);
    }
  });
}