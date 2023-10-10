const express = require('express')
const passport = require('passport')

const Article = require('../models/article')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /articles
router.get('/articles', (req, res, next) => {
	Article.find()
		.populate('owner')
		.populate('editors')
		.then((articles) => {
			return articles.map((article) => article.toObject())
		})
		.then((articles) => res.status(200).json({ articles: articles }))
		.catch(next)
})

// SHOW
// GET /articles/5a7db6c74d55bc51bdf39793
router.get('/articles/:id', (req, res, next) => {
	Article.findById(req.params.id)
		.populate('owner')
		.populate('editors')
		.then(handle404)
		.then((article) => res.status(200).json({ article: article.toObject() }))
		.catch(next)
})

// CREATE
// POST /articles
router.post('/articles', requireToken, (req, res, next) => {
	req.body.article.owner = req.user.id
	req.body.article.editors = [req.user.id]

	Article.create(req.body.article)
		.then((article) => {
			res.status(201).json({ article: article.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /articles/5a7db6c74d55bc51bdf39793
router.patch('/articles/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.article.owner

	Article.findById(req.params.id)
		.then(handle404)
		.then((article) => {
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			if (!article.editors.includes(req.user.id)) {
				article.editors.push(req.user.id)
			}
			return article.updateOne(req.body.article)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /articles/5a7db6c74d55bc51bdf39793
router.delete('/articles/:id', requireToken, (req, res, next) => {
	Article.findById(req.params.id)
		.then(handle404)
		.then((article) => {
			requireOwnership(req, article)
			article.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
