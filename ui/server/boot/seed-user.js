var Promise = require('bluebird');
module.exports = function (app, cb) {
  var user = app.models.User;
  Promise.resolve()
    .then(function () {
      return user.findOrCreate(
        {
          where: {
            email: 'goodjob@shoppinpal.com'
          }
        },
        {
          username: 'goodjob',
          email: 'goodjob@shoppinpal.com',
          password: 'test123'
        },
        {validate: false});
    })
    .then(function (user_one) {
      console.log('User 1: ', user_one);
      return user.findOrCreate(
        {
          where: {
            email: 'yourock@shoppinpal.com'
          }
        },
        {
          username: 'you_rock',
          email: 'yourock@shoppinpal.com',
          password: 'test123'
        },
        {validate: false});
    })
    .then(function (user_two) {
      console.log('User 2: ', user_two);
      return cb();
    })
    .catch(function (error) {
      console.log('error in creating ', error);
      return cb(error);
    });
};
