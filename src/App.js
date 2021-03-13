import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList/ChatRoomsList';
import SignIn from './components/SignIn/SignIn';
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/chatRoomsList">
          <ChatRoomsList />
        </Route>
        <Route exact path="/chatRoom">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
