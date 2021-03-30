const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date

    type Query{
        usernameCheck(username:String):Boolean
        tokenCheck:TOKEN
        login(LOGIN:USERLOGIN):TOKEN
        facebookLogin(facebookID:ID):TOKEN
        updateToken:TOKEN
    }

    type Mutation{
        register(REGISTER:USERREGISTER):TOKEN    
    }
    type USER{
        username: String,
        status: Boolean
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        role:String
        phone: String
        technicianInfoID:ID
    }
    type TIMEOUT{
        hour:Int
        minutes:Int
    }
    type WORKTIMEOUT{
        start:TIMEOUT
        end:TIMEOUT
    }

    type COMMENT{
        userID: ID
        userInfoID:USERINFO
        comment: String
    }
    type TECHNICIANVALUE{
        aptitude:String
        star:Float
        amountOfvoteStar: Int
        amountOfcomment: Int
        comment: [COMMENT]
    }
    type LOCATIONOUT{
        lat:Float
        lon:Float
    }

    type FORM{
        _id:ID
        senderID:ID
        userInfoID:USERINFO
        detail:String
        image: [String]
        date:String
        techType:String
        location:LOCATIONOUT
        technician:[FORMNOTIC]
    }
    type TECHNICIANINFO{
        _id : ID
        userID:ID
        aptitude: [TECHNICIANVALUE]
        frontStore:Boolean
        onSite: Boolean
        acceptForm:[FORM]
        newForm:[FORM]
        star: Float
        amount:Int
        address:AddressOUT
        description: String
        bio:String
        userInfoID: USERINFO
        count: Int
        status:Boolean
        workDay:[Int]
        workTime:WORKTIMEOUT
    }
    type FORMNOTIC{
        tech:TECHNICIANINFO
        minPrice:Int
        maxPrice:Int
        location:LOCATIONOUT
    }
    type TOKEN{
        token:String
        username:String
        status:Boolean
        firstname: String
        lastname:String
        avatar:String
        role:String
        userID:ID
        userInfoID:ID
        phone: String
        technicianInfoID:TECHNICIANINFO
        chatHistry: [CHAT]
        forms:[FORM]
        acceptForms:[FORM]
    }
    type CHAT{
        _id:ID
        userID:ID,
        userAvatar:String,
        userName:String,
        userFirstname:String,
        technicianID: ID,
        technicianAvatar:String
        technicianFirstname:String,
        technicianName:String,
        recentMessage:HISTORY,
        history: [HISTORY],
        status:Boolean,
        userReadStatus:Boolean,
        technicianReadStatus:Boolean
    }

    type HISTORY{
        sender: ID,
        message: String,
        date: Date
        msgType: String,
    }
    input USERLOGIN{
        username:String
        password:String
    }

    
    input USERREGISTER{
        username: String
        password: String
        firstname: String
        lastname:String
        phone:String
        avatar:String
        role: String
    }
`);
