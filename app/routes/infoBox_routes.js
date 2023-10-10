const express = require('express')
const passport = require('passport')
const Article = require('../models/article')
const InfoBox = require('../models/infoBox')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST /infoboxes/:articleId
router.post('/infoboxes/:articleId', requireToken, removeBlanks, (req, res, next) => {
	const infoBox = req.body.infoBox
	const articleId = req.params.articleId

	Article.findById(articleId)
		.then(handle404)
		.then((article) => {
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			if (!article.editors.includes(req.user.id)) {
				article.editors.push(req.user.id)
			}
			article.infoboxes.push(infoBox)
			return article.save()
		})
		.then(article => res.status(201).json({ article:article }))
		.catch(next)
})

// UPDATE
// PATCH /articles/5a7db6c74d55bc51bdf39793
router.patch('/infoboxes/:articleId/:infoBoxId', requireToken, removeBlanks, (req, res, next) => {
	const articleId = req.params.articleId
	const infoBoxId = req.params.infoBoxId

	Article.findById(articleId)
		.then(handle404)
		.then(article => {
			const theInfoBox = article.infoBoxes.id(infoBoxId)
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			if (!article.editors.includes(req.user.id)) {
				article.editors.push(req.user.id)
			}
			theInfoBox.set(req.body.infoBox)
			return article.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /articles/5a7db6c74d55bc51bdf39793
router.delete('/infoboxes/:articleId/:infoBoxId', requireToken, removeBlanks, (req, res, next) => {
	const articleId = req.params.articleId
	const infoBoxId = req.params.infoBoxId

	Article.findById(articleId)
		.then(handle404)
		.then(article => {
			const theInfoBox = article.infoBoxes.id(infoBoxId)
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			theInfoBox.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router