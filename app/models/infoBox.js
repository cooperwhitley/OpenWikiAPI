const mongoose = require('mongoose')

const articleSchema = require('./article')

const infoBoxSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

module.exports = mongoose.model('infoBox', infoBoxSchema)
