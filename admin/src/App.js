import "./app.css"
import Sidebar from "./components/topbar/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/home/userList/UserList";
import User from "./pages/home/user/User";
import NewUser from "./pages/home/newUser/NewUser";
import ProductList from "./pages/home/productList/ProductList";
import Product from "./pages/home/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

const App = () => {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;

  return (

    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />

            <div className="container">

              <Sidebar />

              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/users">
                <UserList />
              </Route>

              <Route exact path="/user/:userId">
                <User />
              </Route>

              <Route exact path="/newUser">
                <NewUser />
              </Route>

              <Route exact path="/products">
                <ProductList />
              </Route>

              <Route exact path="/product/:productId">
                <Product />
              </Route>

              <Route exact path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )
        }
      </Switch>
    </Router >


  );
}

export default App;
