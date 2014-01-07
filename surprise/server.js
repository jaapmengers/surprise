Tiles = new Meteor.Collection("tiles");
CurrentTile = new Meteor.Collection("current-tiles")


if (Meteor.isServer) {
  Meteor.startup(function () {

  	var currentTileNumber = null;

  	Meteor.methods({
  		updateCurrentTile: function(tilenumber){

  			CurrentTile
  			currentTileNumber = tilenumber;
  			return currentTileNumber;
  		}
  	});
  });
}