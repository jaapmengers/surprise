Names = new Meteor.Collection("dingen");

if (Meteor.isClient) {

  Template.hello.count = function(){
      return Names.find({}).count();
  };

  Template.hello.events({
    'click input' : function () {
        Names.insert({name: "Iets"});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
