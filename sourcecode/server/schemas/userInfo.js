const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getAllInformation: [USERINFO]
        getInformation: USERINFO
        getUserInfo(userID:ID):USERINFO
    }

    type Mutation{
        insertInformation(INFORMATION:USERINFOINPUT): USERINFO
        updateInformation(INFORMATION:USERINFOINPUT): USERINFO
    }


    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        avatar:String
        role:String
        phone: String
        technicianInfoID:ID
        chatHistry:[ID]
        forms:[FORM]
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
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type FORMNOTIC{
        tech:TECHNICIANINFO
        minPrice:Int
        maxPrice:Int
        location:LOCATIONOUT
    }
    type LOCATIONOUT{
        lat:Float
        lon:Float
    }

    input USERINFOINPUT{
        firstname: String
        lastname:String
        userID:ID
        role: String
    }

    
`);
