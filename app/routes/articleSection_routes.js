const express = require('express')
const passport = require('passport')
const Article = require('../models/article')
const ArticleSection = require('../models/articleSection')

const mongoose = require('mongoose')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST /sections/:articleId
router.post('/sections/:articleId', requireToken, removeBlanks, (req, res, next) => {
	const section = req.body.articleSection
	const articleId = req.params.articleId

	section.owner = req.user.id

	Article.findById(articleId)
		.then(handle404)
		.then((article) => {
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			if (!article.editors.includes(req.user.id)) {
				article.editors.push(req.user.id)
			}
			article.sections.push(section)
			return article.save()
		})
		.then(article => res.status(201).json({ article:article }))
		.catch(next)
})

// UPDATE
// PATCH /articles/5a7db6c74d55bc51bdf39793
router.patch('/sections/:articleId/:sectionId', requireToken, removeBlanks, (req, res, next) => {
	const articleId = req.params.articleId
	const sectionId = req.params.sectionId

	Article.findById(articleId)
		.then(handle404)
		.then(article => {
			const theSection = article.sections.id(sectionId)
			if (!article.publicallyEditable) {
				requireOwnership(req, article)
			}
			if (!article.editors.includes(req.user.id)) {
				article.editors.push(req.user.id)
			}
			theSection.set(req.body.articleSection)
			return article.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /articles/5a7db6c74d55bc51bdf39793
router.delete('/sections/:articleId/:sectionId', requireToken, removeBlanks, (req, res, next) => {
	const articleId = req.params.articleId
	const sectionId = req.params.sectionId

	Article.findById(articleId)
		.then(handle404)
		.then(article => {
			const theSection = article.sections.id(sectionId)
			requireOwnership(req, article)
			theSection.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
