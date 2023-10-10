const mongoose = require('mongoose')

const userSchema = require('./user')
const infoBoxSchema = require('./infoBox')
const articleSectionSchema = require('./articleSection')

const articleSchema = new mongoose.Schema(
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
		editors: [userSchema],
		publicallyEditable: {
			type: Boolean,
			required: true,
			default: true
		},
		photo: {
			type: String
		},
		infoBoxes: [infoBoxSchema],
		sections: [articleSectionSchema]
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

articleSchema.virtual('editorList').get(function () {
	if (this.editors.length === 1 && this.owner.name) {
		return `edited by: ${this.owner.name}`
	} else if (this.editors.length === 1) {
		return `edited by: ${this.owner.userName}`
	}
	let editorNames = []
	this.editors.forEach(editor => {
		if (editor.name) {
			editorNames.push(editor.name)
		} else {
			editorNames.push(editor.userName)
		}
	})
	let editorNameList = editorNames.join(', ')
	return `edited by: ${editorNameList}`
})

module.exports = mongoose.model('Article', articleSchema)
