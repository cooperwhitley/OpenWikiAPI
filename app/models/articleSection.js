const mongoose = require('mongoose')

const articleSchema = require('./article')

const articleSectionSchema = new mongoose.Schema(
	{
		heading: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: {
			type: String
		},
		imageCaption: {
			type: String
		}
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

module.exports = mongoose.model('articleSection', articleSectionSchema)
