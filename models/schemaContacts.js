const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 7,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  phone: Joi.string().min(7).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  favorite: Joi.bool().valid(false, true),
});

const favoriteChema = Joi.object({
  favorite: Joi.bool().valid(false, true).required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, JoiSchema, favoriteChema };
