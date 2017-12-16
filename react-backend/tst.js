var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./app.js');
  });
  afterEach(function () {

  });
  it('responds to /api', function testData(done) {
  request(server)
    .get('/api')
    .expect(200, done);
  });
  it('responds to /apiT', function testDataForTeam(done) {
  request(server)
    .get('/apiT')
    .expect(200, done);
  });
  it('responds to /api/profile', function testDataForProfile(done) {
  request(server)
    .post('/api/profile')
    .expect(200, done);
  });
  it('responds to /api/edit_profile', function testEdit(done) {
  request(server)
    .post('/api/edit_profile')
    .expect(200, done);
  });
  it('responds to /api/create_account', function testCreateAccount(done) {
  request(server)
    .post('/api/create_account')
    .expect(200, done);
  });
  it('responds to /api/create_event', function testCreateEvent(done) {
  request(server)
    .post('/api/create_event')
    .expect(200, done);
  });
  it('responds to /api/show_event', function testShowEvent(done) {
  request(server)
    .post('/api/show_event')
    .expect(200, done);
  });
  it('responds to /api/search_event', function testSearch(done) {
  request(server)
    .post('/api/search_event')
    .expect(200, done);
  });
  it('responds to /api/sign_in', function testSignIn(done) {
  request(server)
    .post('/api/sign_in')
    .expect(200, done);
  });
  it('responds to /api/create_profile', function testCreateProfile(done) {
  request(server)
    .post('/api/create_profile')
    .expect(200, done);
  });
  it('responds to /logout', function testLogout(done) {
  request(server)
    .get('/logout')
    .expect(200, done);
  });
  it('responds to /username', function testUsername(done) {
  request(server)
    .post('/username')
    .expect(200, done);
  });
  it('responds to /api/view_team', function testViewTeam(done) {
  request(server)
    .post('/api/view_team')
    .expect(200, done);
  });
  it('responds to /api/user_teams', function testUserTeam(done) {
  request(server)
    .post('/api/user_teams')
    .expect(200, done);
  });
  it('responds to /api/edit_team', function testEditTeam(done) {
  request(server)
    .post('/api/edit_team')
    .expect(200, done);
  });
  it('responds to /api/join_event', function testJoinTeam(done) {
  request(server)
    .post('/api/join_event')
    .expect(200, done);
  });
  it('responds to /api/give_team', function testGiveTeam(done) {
  request(server)
    .post('/api/give_team')
    .expect(200, done);
  });
  it('responds to /api/reject_team', function testRejectTeam(done) {
  request(server)
    .post('/api/reject_team')
    .expect(200, done);
  });
  it('responds to /api/team_matched', function testTeamMatched(done) {
  request(server)
    .post('/api/team_matched')
    .expect(200, done);
  });
  it('responds to /check_login', function testTeamMatched(done) {
  request(server)
    .post('/check_login')
    .expect(200, done);
  });
  it('responds to /get_name', function testTeamMatched(done) {
  request(server)
    .get('/get_name')
    .expect(200, done);
  });
});
