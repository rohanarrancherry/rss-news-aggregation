const User = require('../models/User');
const jwt = require('jsonwebtoken');

// create a page for unknown url
const invalidUrl = (request, response) => {
    response.status(404).send({ error: 'Something is broken : Unknown URL' })
  }

const errorHandler = (error, request, response, next) => {
console.error(error.message);

if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
}

else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
} 

else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
    error: 'invalid token'
    })
} 

else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
    error: 'token expired'
    })
}

next(error)
}


const getToken = (request, response, next) => {
const authorizationHeader = request.get('authorization')
if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    request.token = authorization.split(' ')[1];
} 
else {
    request.token = null
}
next()
}


const getUser = async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token verification failed' })
    }
    const user = await User.findById(decodedToken.id)
  
    if (user) {
      request.user = user
      next()
    } 
    else {
      return response.status(401).json({ error: 'user not found' })
    }
  
  }

  module.exports = {
      invalidUrl,
      errorHandler,
      getToken,
      getUser
  }