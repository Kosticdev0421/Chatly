import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList/ChatRoomsList';
import SignIn from './components/SignIn/SignIn';
import SignUp from "./components/SignUp/SignUp";
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  {user ? <ChatRoom /> : <SignIn />}
              </Route>
              <Route exact path="/signup">
                  <SignUp />
              </Route>
              <Route exact path="/chatRoomsList">
                  {user && <ChatRoomsList />}
              </Route>
              <Route exact path="/chatRoom">
                  {user ? <ChatRoom /> : <SignIn />}
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
