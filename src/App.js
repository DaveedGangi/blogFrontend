import {Switch,Route} from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import NotFound from "./components/notfound";
import AddNewPost from "./components/addnewpost";
import Post from "./components/specificpost";
import EditPost from "./components/editpost";
import ProtectedRoute from "./components/protectedroute";
import Footer from "./components/footer";

import './App.css';

function App() {
  return (
    <div>
    

      <main>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/add-new-post" component={AddNewPost} />
          <ProtectedRoute exact path="/post/:id" component={Post} />
          <ProtectedRoute exact path="/edit-post/:id" component={EditPost} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer/>

      

    </div>
  );
}

export default App;
