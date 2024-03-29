import './prism.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./Auth/PrivateRoute ";
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import EditBlog from './pages/EditBlog';
import ScrollToTop from "./util/ScrollToTop";

library.add(faPlus, faFacebook, faTwitter);

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Blog />} />
            <Route path="/editblog/:id" element={<EditBlog />} />
            <Route element={<PrivateRoute />}>
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
