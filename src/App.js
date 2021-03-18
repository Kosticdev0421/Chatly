import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList/ChatRoomsList';
import CreateRoom from "./components/CreateRoom/CreateRoom";
import SignIn from './components/SignIn/SignIn';
import SignUp from "./components/SignUp/SignUp";
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  {user ? <ChatRoomsList /> : <SignIn />}
              </Route>
              <Route exact path="/signup">
                  <SignUp />
              </Route>
              <Route exact path="/chatRoomsList">
                  {user && <ChatRoomsList />}
              </Route>
              <Route exact path="/chatRoom/:roomId">
                  {user ? <ChatRoom /> : <SignIn />}
              </Route>
              <Route exact path="/createRoom">
                  {user ? <CreateRoom /> : <SignIn />}
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
