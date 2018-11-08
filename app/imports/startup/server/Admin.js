import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

/* Our Admin accounts are gonna be hard-coded in through settings. */
function createAdmin(email, password, role) {
  console.log(`  Creating ${role} ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up our default admin accounts. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAdmins) {
    console.log('Creating the default admins');
    Meteor.settings.defaultAdmins.map(({ email, password, role }) => createAdmin(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
