const express = require('express')
const router = express.Router()
const DI = require('~infrastructure/api/DI.api.js')
const validationSchema = require('~infrastructure/middlewares/validateMiddleware')
const { createPost, updatePost } = require('./validation.schema')

module.exports = () => {
  const controller = DI.resolve('postController')
  const authCheck = DI.resolve('authExistsMiddleware')
  router.post('/posts/create/:username', authCheck, validationSchema(createPost), controller.createPost.bind(controller))
  router.put('/posts/:postId', authCheck, validationSchema(updatePost), controller.updatePost.bind(controller))
  router.delete('/posts/:postId', authCheck, controller.deletePost.bind(controller))
  router.get('/posts/:postId', controller.getPostById.bind(controller))
  // router.get('/posts', controller.getAllPosts.bind(controller))
  router.get('/posts/user/:username', controller.getPostsByUsername.bind(controller))
  return router
}
