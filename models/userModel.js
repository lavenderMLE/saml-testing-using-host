const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique : true ,
        required : true,
    },
    password: {
        type: String,
        required : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    company_name : {
        type :String,
        required : true
    },
    is_email_verified : {
        type : Boolean,
        required : true
    },
    email_verify_code : {
        type : String,
        default : null
    },
    forgot_code : {
        type : String,
        default : null
    },
    is_profile_created : {
        type : Boolean,
        default : false
    },
    avatar_id : {
        type : String,
        default : null
    },
    birthday : {
        type : String,
        default : null
    },
    city : {
        type : String,
        default : null
    },
    country : {
        type : String,
        default  :null
    },
    language: {
        type : String,
        default : null
    },
    postal_code : {
        type : String,
        default :null
    },
    street : {
        type :String,
        default  : null
    },
    stripe_customer_id : {
        type : String,
        default : null
    },
    stripe_account_id  :{
        type : String,
        default : null
    },
    stripe_balance : {
        type : Number,
        default : 0
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;