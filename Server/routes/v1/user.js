import crypto from 'crypto';
import async from 'async';

//var mysql_dbc = require('../../db/db_con')();
//var connection = mysql_dbc.init();

require('dotenv').config({silent: true});

export const signUp = (req, res) => {
  var {
    userId,
    userName,
    userPasswd,
    userPasswdCheck
  } = req.body;

  var userSalt = crypto.randomBytes(32).toString();

  if(!userId || !userName || !userPasswd || !userPasswdCheck) {
    res.status(400).json({
      code: 400,
      v: 'v1',
      api: 'signUp',
      status: 'ERR',
      detail: {
        err: 'FORMAT',
        message: 'INVAILD FORMAT'
      }
    });
  }

  if(userId >= 50) userId = userId.slice(0, 50);
  if(userName >= 50) userName = userName.slice(0, 50);

  async.waterfall([
    (callback) => {
      userPasswd = crypto.pbkdf2Sync(userPasswd, userSalt, 1, 32, 'sha512').toString('hex');
      userPasswdCheck = crypto.pbkdf2Sync(userPasswdCheck, userSalt, 1, 32, 'sha512').toString('hex');
      callback(null, '');
    }
  ],
  (err, result) => {
    if(err) {
      res.status(500).json(err);
    }else {
      res.json({
        code: 200,
        v: 'v1',
        api: 'signUp',
        status: 'SUCCESS',
        detail: 'Sign up successful!'
      });
    }
  });
};