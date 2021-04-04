const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const chatInformation = await chatModel.findOne({
        $or: [
          {
            technicianID: INFORMATION.technicianID,
            userID: INFORMATION.userID,
          },
          {
            userID: INFORMATION.technicianID,
            technicianID: INFORMATION.userID,
          },
        ],
      });

      if (chatInformation === null) {
        const technician = await userInfoModel.findOne({
          userID: INFORMATION.technicianID,
        });
        const user = await userInfoModel.findOne({
          userID: INFORMATION.userID,
        });
        INFORMATION["userInfoID"] = user.userInfoID;
        INFORMATION["userAvatar"] = user.avatar;
        INFORMATION["userName"] = user.firstname + " " + user.lastname;
        INFORMATION["userFirstname"] = user.firstname;
        INFORMATION["technicianInfoID"] = technician.userInfoID;
        INFORMATION["technicianName"] =
          technician.firstname + " " + technician.lastname;
        INFORMATION["technicianFirstname"] = technician.firstname;
        INFORMATION["technicianID"] = INFORMATION.technicianID;
        INFORMATION["technicianAvatar"] = technician.avatar;
        INFORMATION["technicianReadStatus"] = false;
        INFORMATION["userReadStatus"] = false;
        INFORMATION["history"] = [];
        const chat = await chatModel.create(INFORMATION);
        chat["status"] = true;

        await userInfoModel.updateOne(
          { userID: INFORMATION.userID },
          { $push: { chatHistry: chat._id } }
        );
        await userInfoModel.updateOne(
          {
            userID: technician.userID,
          },
          { $push: { chatHistry: chat._id } }
        );
        return true;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
  getChatInformation: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const sender = await chatModel.findOne({
          $or: [
            { technicianID: args.technicianID, userID: args.userID },
            { userID: args.technicianID, technicianID: args.userID },
          ],
        });
        if (args.userID !== sender.recentMessage.sender) {
          var updateData =
            args.userID === sender.userID
              ? { userReadStatus: true }
              : { technicianReadStatus: true };
          const chatInformation = await chatModel.findByIdAndUpdate(
            { _id: sender._id },
            { $set: updateData },
            { new: true }
          );
          chatInformation["status"] = true;
          return chatInformation;
        } else {
          return { status: true };
        }
      }
    } catch (error) {
      return { status: false };
    }
  },
  getChatInformationByID: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const sender = await chatModel.findOne({
          _id: args.chatID,
        });
        if (req.userID !== sender.recentMessage.sender) {
          var updateData =
            req.userID === sender.userID
              ? { userReadStatus: true }
              : { technicianReadStatus: true };
          const chatInformation = await chatModel.findByIdAndUpdate(
            { _id: sender._id },
            { $set: updateData },
            { new: true }
          );
          chatInformation["status"] = true;
          return chatInformation;
        } else {
          return { status: true };
        }
      }
    } catch (error) {
      return { status: false };
    }
  },
  getChatRoom: async (args, req) => {
    if (req.role !== null && req.role !== undefined) {
      const user = await userInfoModel
        .findOne({
          userID: args.userID,
        })
        .populate({ path: "chatHistry", select: "-history" });
      return user.chatHistry;
    }
  },
  chat: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const findSender = await chatModel.findOne({
        userID: INFORMATION.message.sender,
        technicianID: INFORMATION.technicianID,
      });
      var userReadStatus = findSender === null ? false : true;
      var technicianReadStatus = findSender === null ? true : false;
      const chat = await chatModel.updateOne(
        {
          $or: [
            {
              userID: INFORMATION.message.sender,
              technicianID: INFORMATION.technicianID,
            },
            {
              userID: INFORMATION.technicianID,
              technicianID: INFORMATION.message.sender,
            },
          ],
        },
        {
          $set: {
            recentMessage: INFORMATION.message,
            userReadStatus: userReadStatus,
            technicianReadStatus: technicianReadStatus,
          },
          $push: { history: INFORMATION.message },
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  },
};
