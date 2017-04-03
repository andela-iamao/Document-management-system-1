const jwt = require('jsonwebtoken');
const model = require('../models');

class UsersController {
 static createUser(request, response) {
   model.User.findOne({ where: { userName: request.body.userName } })
     .then((user) => {
       if (!user) {
         model.User.create({
           userName: request.body.userName,
           firstName: request.body.firstName,
           lastName: request.body.lastName,
           email: request.body.email,
           password: request.body.password,
         })
           .then((newUser) => {
             const token = jwt.sign({
               UserId: newUser.id,
               RoleId: newUser.RoleId
             }, 'secret', { expiresIn: '2 days' });
             return response.status(201)
             .send({ newUser, token, expiresIn: '2 days' });
           })
           .catch(error => response.status(400)
             .send(error.errors));
       }
       return response.status(409)
         .send({ message: `${request.body.userName} is already in use` });
     });
 }
}