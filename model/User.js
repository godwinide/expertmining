const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: false,
        default: 0
    },    
    referral:{
        type: Number,
        required: false,
        default: 0
    },    
    referral_bitcoin:{
        type: Number,
        required: false,
        default: 0
    },    
    balance_bitcoin:{
        type: Number,
        required: false,
        default: 0
    },    
    total_profit:{
        type: Number,
        required: false,
        default: 0
    },
    total_profit_bitcoin:{
        type: Number,
        required: false,
        default: 0
    },
    total_deposit:{
        type: Number,
        required: false,
        default: 0
    },
    total_deposit_bitcoin:{
        type: Number,
        required: false,
        default: 0
    },
    pin:{
        type: String,
        required: false,
        default: Math.random().toString().slice(2,7)
    },
    plans:{
        type: String,
        required: false,
        default: "STARTER ($1,000 - $10,000)"
    },
    regDate:{
        type: Date,
        required: false,
        default: Date.now()
    }
});

module.exports = User = model("User", UserSchema);