const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

// const User = mongoose.model('User', userSchema)

// exporting the schema only as it allows me to reference multiple users as editors for articles
// making the conversion to a model within /app/routes/user_routes.js should (?) work
// as in traditional usage I believe that's the only place it should really come up
// as owner references a schema instead
module.exports = userSchema
