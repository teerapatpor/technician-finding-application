const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(userID:ID):TECHNICIANINFO
        searchTechnician(word:String):SEARCHOUTPUT
        getNearTechnician(ADDRESS:GETNEAR):SEARCHOUTPUT
        fromSearchTech(word:String,lat:Float,lon:Float,date:String,senderID:ID):SEARCHOUTPUT
        saveAcceptForm(formID:ID,userID:ID):Boolean
        saveWaitingForm(formID:ID,userID:ID):Boolean
        findbyType(aptitude:String,lat:Float,lon:Float):SEARCHOUTPUT
        getUserVote(userID:ID):TECHNICIANINFO
    }

    type Mutation{
        insertTechnicianInfo(aptitude: [String]): TECHNICIANINFO
        createTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANUPDATE): TECHNICIANINFO  
        userVote(userID:ID,aptitude:String,voteStar:Int):TECHNICIANINFO
        userComment(userID:ID,comment:String,aptitude:String):commentOut
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
    type TIMEOUT{
        hour:Int
        minutes:Int
    }

    type commentOut{
        aptitude:[TECHNICIANVALUE]
        status:Boolean
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

    type SEARCHOUTPUT{
        technician:[TECHNICIANINFO]
        status:Boolean
    }
      
    input AddressIN{
        lat:Float
        lon:Float
    }
    input TIMEIN{
        hour:Int
        minutes:Int
    }
    input WORKTIMEIN{
        start:TIMEIN
        end:TIMEIN
    }
    input TECHNICIANINFOINPUT{
        aptitude: [String]
        workTime:WORKTIMEIN
        workDay : [Int]
        frontStore:Boolean!
        onSite: Boolean!
        address:AddressIN
        description: String
        bio: String
    }
    input TECHNICIANUPDATE{
        frontStore:Boolean!
        onSite: Boolean!
        description: String
        bio:String
        address:AddressIN
    }

    input GETNEAR{
        address:AddressIN!
    }
`);
