const model = require('../models');


/**
 * Class DocumentsController
 * To handle routing logic for documents route
 */
class DocumentsController {


/**
 * static getDocuments
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 * @memberOf DocumentsController
 */
  static getDocuments(request, response) {
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { UserId: request.decoded.UserId }
        ]
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    model.Document.findAll(query)
      .then(documents => response.status(200)
          .send(documents));
  }
  /**
   * static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} response object
   * @memberOf DocumentsController
   */
  static createDocuments(request, response) {
    return model.Document.create(request.body)
      .then(newDocument => response.status(201)
          .send(newDocument))
      .catch(error => response.status(500)
          .send(error));
  }

  /**
   * static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   * @memberOf DocumentsController
   */
  static getDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
            .send({ message: `Doccument with id ${request.params.id} not found` });
        }
        switch (document.access) {
        case 'public' :
          response.status(200)
          .send(document);
          break;
        case 'private':
          if (document.UserId === request.decoded.UserId) {
            response.status(200)
              .send(document);
          } else {
            response.status(403)
              .send({ message: 'You are not authorized to access this document' });
          }
          break;
        case 'role' :
          model.User.findById(document.UserId)
            .then((documentOwner) => {
              if (documentOwner.RoleId === request.decoded.RoleId) {
                return response.status(200)
                  .send(document);
              }
              return response.status(403)
                .send({ message: 'You are not authorized to access this document' });
            });
          break;
        default:
          return response.status(403)
            .send({ message: 'You are not authorized to access this document' });
        }
      });
  }
/**
   * Method updateDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static updateDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        }
        if (document.UserId === request.decoded.UserId) {
          document.update(request.body)
            .then(updatedDocument => response.status(200)
                .send(updatedDocument));
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }
/**
   * Method deleteDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static deleteDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
          .send({ message: `No document with this id ${request.params.id}` });
        }
        if (document.UserId === request.decoded.UserId) {
          document.destroy()
            .then(() => response.status(200)
                .send({ message: 'Document successfully deleted' }));
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }

}
module.exports = DocumentsController;
