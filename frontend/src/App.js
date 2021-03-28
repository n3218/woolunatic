import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Switch from "react-bootstrap/esm/Switch"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import HomeScreen from "./screens/HomeScreen/HomeScreen"
import CollectionScreen from "./screens/CollectionScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import PayOrderScreen from "./screens/OrderScreen/PayOrderScreen"
import AboutScreen from "./screens/TextScreens/AboutScreen"
import HowToScreen from "./screens/TextScreens/HowToScreen"
import ProductScreen from "./screens/ProductScreen/ProductScreen"
import CartScreen from "./screens/OrderScreen/CartScreen"
import ShippingScreen from "./screens/OrderScreen/ShippingScreen"
import PaymentScreen from "./screens/OrderScreen/PaymentScreen"
import OrderScreen from "./screens/OrderScreen/OrderScreen"
import UserListScreen from "./screens/AdminScreen/UserListScreen"
import UserEditScreen from "./screens/AdminScreen/UserEditScreen"
import ProductListScreen from "./screens/AdminScreen/ProductListScreen"
import ProductEditScreen from "./screens/AdminScreen/ProductEditScreen"
import OrderListScreen from "./screens/AdminScreen/OrderListScreen"
import AdminScreen from "./screens/AdminScreen/AdminScreen"
import GeneralConditionsScreen from "./screens/TextScreens/GeneralConditionsScreen"
import PrivacyPolicyScreen from "./screens/TextScreens/PrivacyPolicyScreen"
import DisclaimerScreen from "./screens/TextScreens/DisclaimerScreen"
import ComplaintsScreen from "./screens/TextScreens/ComplaintsScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path="/about" component={AboutScreen} />
            <Route path="/how-to" component={HowToScreen} />
            <Route path="/general-conditions" component={GeneralConditionsScreen} />
            <Route path="/privacy-policy" component={PrivacyPolicyScreen} />
            <Route path="/disclaimer" component={DisclaimerScreen} />
            <Route path="/complaints" component={ComplaintsScreen} />

            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/profile" exact component={ProfileScreen} />

            <Route path="/cart/:id?/:qty?" component={CartScreen} exact />
            <Route path="/checkout/shipping" component={ShippingScreen} />
            <Route path="/checkout/payment" component={PaymentScreen} />
            <Route path="/checkout/payorder/:id?/:paymentmethod?" exact component={PayOrderScreen} />
            <Route path="/orders/:id" component={OrderScreen} />

            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} exact />
            <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
            <Route path="/admin/orderlist" component={OrderListScreen} exact />
            <Route path="/admin/orderlist/:pageNumber" component={OrderListScreen} exact />
            <Route path="/admin" component={AdminScreen} exact />

            <Route path="/search/:keyword" component={CollectionScreen} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={CollectionScreen} exact />

            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/yarns/page/:pageNumber" component={CollectionScreen} exact />
            <Route path="/yarns/:category" component={CollectionScreen} exact />
            <Route path="/yarns" component={CollectionScreen} exact />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
