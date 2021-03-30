var clients = [];
const formController = require("../controllers/form");
const technicianController = require("../controllers/technicianInfo");
const chatModel = require("../models").chats;
module.exports = (app, io, db) => {
  //-------------------- START AUTHENTICATION ----------------------------------

  io.on("connection", function (socket) {
    // console.log(`${socket.id} connected ,` , socket.handshake.query.uid);
    if(socket.handshake.query.uid.length !== 0){
      socket.emit('reconnect')
    }
    socket.on("join", ({ uid }) => {
      var clientInfo = new Object();
      clientInfo.uid = uid;
      clientInfo.sid = socket.id;
      clients[uid] = clientInfo;
      console.log(clients);
      socket.emit("join", { id: socket.id });
      // socket.emit("delete_client");
    });
    socket.on("leave", ({ uid }) => {
      console.log(uid, "leave api room");
      socket.leave("api");
      delete clients[uid];
    });

    socket.on("disconnect", function () {
      for (var client in clients) {
        if (clients[client].sid === socket.id) {
          delete clients[client];
          console.log('disconnect' ,clients, socket.id);
          break;
        }
      }
    });

    //-------------------- END AUTHENTICATION ----------------------------------

    //-------------------- START CHAT ----------------------------------

    socket.on("send_message", async function (data) {
      const findSender = await chatModel.findOne({
        userID: data.message.sender,
        technicianID: data.receiver,
      });
      var userReadStatus = findSender === null ? false : true;
      var technicianReadStatus = findSender === null ? true : false;
      await chatModel
        .updateOne(
          {
            $or: [
              {
                userID: data.message.sender,
                technicianID: data.receiver,
              },
              {
                userID: data.receiver,
                technicianID: data.message.sender,
              },
            ],
          },
          {
            $set: {
              recentMessage: data.message,
              userReadStatus: userReadStatus,
              technicianReadStatus: technicianReadStatus,
              readStatus: false,
            },
            $push: { history: data.message },
          }
        )
        .then(() => {
          if (clients[data.receiver] !== undefined) {
            socket.to(clients[data.receiver].sid).emit("receive_message", {
              message: {
                ...data.message,
              },
            });
          } else {
            console.log("not available");
          }
        })
        .catch(() => {
          console.log("cannot send message");
        });
    });

    //-------------------- END CHAT ----------------------------------

    //-------------------- START POST REQUEST ----------------------------------
    socket.on("send_post_req", async function (data) {
      const INFORMATION = data;
      const form = await formController.addForm({ INFORMATION });
      const tech = await technicianController.fromSearchTech({
        word: data.techType,
        lat: data.location.lat,
        lon: data.location.lon,
        date: data.date,
        senderID: data.senderID,
      });
      await technicianController.saveNewForm({
        technician: tech.technician,
        formID: form._id,
      });
      socket.emit("confirm_send_post_req", { form });
      tech.technician.map((item) => {
        if (clients[item.userID] !== undefined) {
          socket
            .to(clients[item.userID].sid)
            // .emit("update_tech_order", { form });
            .emit("recieve_new_post_req", { form });
        }
      });
      // socket
      //   .to(clients["5ffed875c2aad77514888d92"].sid)
      //   .emit("send_post_req", { data });
    });

    socket.on("accepted_req", async ({ data, tech }) => {
      // console.log("data", data);
      const INFORMATION = data;
      const result = await formController.techAcceptForm({ INFORMATION });
      console.log("result", result);
      socket.emit("confirm_accepted_req");
      if (clients[result.senderID] !== undefined) {
        socket
          .to(clients[result.senderID].sid)
          // .emit("update_user_response", result);
          .emit("recieve_new_response", { tech, result });
      }
    });

    socket.on("cancel_request", ({ formID }) => {
      formController.deleteForm({ formID }).then((res) => {
        console.log(`cancel form ${formID} ${res}`);
        socket.emit("confirm_cancel_request", { status: res });
      });
    });

    socket.on("confirm_technician", async ({ formID, userID, techID }) => {
      console.log(formID, userID, techID);
      await formController.userAcceptForm({ formID, userID, techID });
      socket.emit("confirm_confirm_technician");
      if (clients[techID] !== undefined) {
        socket
          .to(clients[techID].sid)
          // .emit("update_user_response", result);
          .emit("confirm_technician_response", {formID});
      }
    });

    //-------------------- END POST REQUEST ----------------------------------
  });
};
