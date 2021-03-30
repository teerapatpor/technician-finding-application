const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date
    
    type Query{
        _:Boolean
        getChatInformation(technicianID:ID,userID:ID):CHAT
        getChatRoom(userID:ID):[CHAT]
        getChatInformationByID(chatID:ID):CHAT
    }

    type Mutation{
        createChatRoom(INFORMATION:createChatInput):Boolean
        chat(INFORMATION:CHATINPUT):Boolean
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
    type COMMENT{
        userID: ID
        userInfoID:USERINFO
        comment: String
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type TIMEOUT{
        hour:Int
        minutes:Int
    }
    type WORKTIMEOUT{
        start:TIMEOUT
        end:TIMEOUT
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
    type HISTORY{
        sender: ID,
        message: String,
        date: Date
        msgType: String,
    }

    input messageIn{
        sender:ID,
        message: String,
        msgType: String,
    }

    input createChatInput{
        technicianID: ID,
        userID:ID
    }

    input CHATINPUT{
        technicianID: ID,
        message:messageIn
    }

    

`);
