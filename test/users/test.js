const testLoader= require('../util/testLoader');

testLoader('/login', '../users/login');
testLoader('/register', '../users/register');
testLoader('/profile', '../users/profile');
testLoader('/topUp', '../users/topUp');
testLoader('/subscribe', '../users/subscribe');