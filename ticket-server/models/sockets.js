const TicketList = require("./ticket-list");

// ----------------------------------------------------------------------

class Sockets {
  constructor(io) {
    this.io = io;
    // ticket list instance
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("connected client", socket.id);

      socket.on("request-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket-2-work", ({ username, desktop }, callback) => {
        const yourTicket = this.ticketList.assignTicket(username, desktop);
        callback(yourTicket);

        this.io.emit("current-tickets", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
