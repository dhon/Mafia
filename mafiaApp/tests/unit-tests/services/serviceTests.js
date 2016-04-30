describe("Testing Services", function(){
  var services;
  beforeEach(module('app.services'));
  beforeEach(inject(function (_services_) {
        services = _services_;
  }));
  it('instance of factory: services', inject(function(services) {
       expect(services).toBeDefined();
  }));
  it('test for save function', function () { 
    expect(angular.isFunction(services.getUser)).toBe(true);
  });
  it('test to make sure empty initial roles', inject(function(services) {
    expect(services.getUser(0).uname).toEqual("");
  }));
  it('test kill', inject(function(services) {
    var userToKill = services.getUser(0);
    services.kill(userToKill);
    expect(services.getUser(0).status).toEqual(false);
  }));
  it('test check mafia', inject(function(services) {
    services.setUserRole(0, "Mafioso");
    var userToCheck = services.getUser(0);
    expect(services.check(userToCheck)).toEqual("Mafia");
  }));
  it('test check town', inject(function(services) {
    services.setUserRole(0, "Medic");
    var userToCheck = services.getUser(0);
    expect(services.check(userToCheck)).toEqual("Town");
  }));
  it('test save', inject(function(services) {
    var userToSave = services.getUser(0);
    services.save(userToSave);
    expect(services.getUser(0).saved).toEqual(true);
  }));
  it('reset all test', inject(function(services) {
    var userToKill = services.getUser(0);
    services.kill(userToKill);
    services.resetAll();
    expect(userToKill.status).toEqual(true);
  }));
  it('target test set', inject(function(services) {
    var userTargeting = services.getUser(3);
    userTargeting.target = 1;
    expect(userTargeting.target).toEqual(1);
  }));
  it('test Game over with tied teams', inject(function(services) {
    var userTemp = services.getUser(0);
    services.kill(userTemp);

    userTemp = services.getUser(1);
    services.kill(userTemp);

    userTemp = services.getUser(2);
    services.kill(userTemp);
    services.setUserRole(1, "Medic");
    services.setUserRole(0, "Cop");

    services.setUserRole(5, "Mafioso");
    services.setUserRole(6, "Mafioso");
    expect(services.isGameOver()).toEqual(true);
  }));
  it('test game over with more town', inject(function(services) {
    var userTemp = services.getUser(0);
    services.kill(userTemp);

    userTemp = services.getUser(4);
    services.kill(userTemp);

    services.setUserRole(1, "Vanilla");
    services.setUserRole(2, "Medic");
    services.setUserRole(3, "Cop");

    services.setUserRole(5, "Mafioso");
    services.setUserRole(6, "Mafioso");
    expect(services.isGameOver()).toEqual(false);
  }));
  it('test game over with starting state', inject(function(services) {
    var userTemp = services.getUser(0);
    services.kill(userTemp);

    services.setUserRole(0, "Vanilla");
    services.setUserRole(1, "Vanilla");
    services.setUserRole(2, "Vanilla");
    services.setUserRole(3, "Medic");
    services.setUserRole(4, "Cop");
    services.setUserRole(5, "Mafioso");
    services.setUserRole(6, "Mafioso");
    expect(services.isGameOver()).toEqual(false);
  }));
  it('test game over with equal town and mafia', inject(function(services) {
    var userTemp = services.getUser(0);
    services.kill(userTemp);

    services.setUserRole(0, "Vanilla");
    services.setUserRole(1, "Vanilla");
    services.setUserRole(2, "Vanilla");
    services.setUserRole(4, "Mafioso");
    services.setUserRole(5, "Mafioso");
    services.setUserRole(6, "Mafioso");
    expect(services.isGameOver()).toEqual(true);
  }));
  it('test pass vote all yes', inject(function(services) {
    services.setUserVote(0, "Yes");
    services.setUserVote(1, "Yes");
    services.setUserVote(2, "Yes");
    services.setUserVote(3, "Yes");
    services.setUserVote(4, "Yes");
    services.setUserVote(5, "Yes");
    services.setUserVote(6, "Yes");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("die");
  }));
  it('test pass vote all no', inject(function(services) {
    services.setUserVote(0, "No");
    services.setUserVote(1, "No");
    services.setUserVote(2, "No");
    services.setUserVote(3, "No");
    services.setUserVote(4, "No");
    services.setUserVote(5, "No");
    services.setUserVote(6, "No");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("live");
  }));
  it('test pass vote majority no', inject(function(services) {
    services.setUserVote(0, "No");
    services.setUserVote(1, "No");
    services.setUserVote(2, "No");
    services.setUserVote(3, "Yes");
    services.setUserVote(4, "Yes");
    services.setUserVote(5, "Yes");
    services.setUserVote(6, "No");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("live");
  }));
  it('test pass vote majority yes', inject(function(services) {
    services.setUserVote(0, "No");
    services.setUserVote(1, "No");
    services.setUserVote(2, "No");
    services.setUserVote(3, "Yes");
    services.setUserVote(4, "Yes");
    services.setUserVote(5, "Yes");
    services.setUserVote(6, "Yes");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("die");
  }));
  it('test dead user does not effect outcome of vote', inject(function(services) {
    var userToKill = services.getUser(0);
    services.kill(userToKill);
    var userToKill = services.getUser(1);
    services.kill(userToKill);
    services.setUserVote(0, "No");
    services.setUserVote(1, "No");
    services.setUserVote(2, "No");
    services.setUserVote(3, "Yes");
    services.setUserVote(4, "Yes");
    services.setUserVote(5, "Yes");
    services.setUserVote(6, "No");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("die");
  }));
  it('test even vote does not pass', inject(function(services) {
    var userToKill = services.getUser(0);
    services.kill(userToKill);
    services.setUserVote(1, "No");
    services.setUserVote(2, "No");
    services.setUserVote(3, "Yes");
    services.setUserVote(4, "Yes");
    services.setUserVote(5, "Yes");
    services.setUserVote(6, "No");
    services.checkVote();
    expect(services.getUserVoteResult()).toEqual("live");
  }));
});