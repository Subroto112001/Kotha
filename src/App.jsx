import React from "react";
import List from "./Comppnents/List/List";
import Chat from './Comppnents/Chats/Chat'
import Details from "./Comppnents/Details/Details";
const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />

      <Details />
    </div>
  );
};

export default App;
