import React from "react";
// pages
import RouterPage from "./pages/RouterPage";
// context
import UiProvider from "./context/UiContext";
import { SocketProvider } from "./context/SocketContext";

// ----------------------------------------------------------------------

const TicketApp = () => {
  return (
    <SocketProvider>
      <UiProvider>
        <RouterPage />
      </UiProvider>
    </SocketProvider>
  );
};

export default TicketApp;
