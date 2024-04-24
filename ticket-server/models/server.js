// Servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Htpp server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /** Configuaraciones */
    });

    // Init sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());

    // last tickets
    this.app.get("/last-tickets", (req, res) => {
      res.json({
        ok: true,
        latest: this.sockets.ticketList.last13,
      });
    });
  }

  //   socketsConfiguration() {
  //     new Sockets(this.io);
  //   }

  execute() {
    this.middlewares();

    // this.socketsConfiguration();

    this.server.listen(this.port, () => {
      console.log("🚀 Server on port:", this.port);
    });
  }
}

module.exports = Server;
