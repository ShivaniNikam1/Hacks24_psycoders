import "./App.css";
import { Contact } from "./contact/contact";
import { Header } from "./headerFooter/header";
import { Footer } from "./headerFooter/footer";
import { RestrictedPage } from "./restrictedPage/restricted";
import { PricingPlan } from "./pricingPlan/pricingPlan";
import { Faq } from "./faq/faq";
import { ProjectDetails } from "./projectDetails/projectDetails";
import { Team } from "./team/team";
import { TeamSingle } from "./teamSingle/teamSingle";
import { About } from "./about/about";
import { NotFound } from "./404/404";
import { BlogDetails } from "./blogDetails/blogDetails";
import { Services } from "./servicesPage/services";
import { ServiceSingle } from "./serviceSingle/serviceSingle";
import { Home } from "./home/home";
import { Blog } from "./blog/blog";
import { Project } from "./project/project";
import { Terms } from "./Allterms/terms";
import { Cookies } from "./Allterms/cookies";
import { Privacy } from "./Allterms/privacy";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { SmoothScroll } from "./smooth";
import { Products } from "./products/Product";
import { useRecoilState } from "recoil";
import RegisterDesigner from "./RegisterDesigner/RegisterDesigner";
import RegisterFamily from "./RegisterFamily/RegisterFamily";
import { userState } from "./atom/useratom";

import DesignerList from "./DesignerList/DesignerList";
import Login from "./Login/Login";
import DesignerProfile from "./DesignerProfile/DesignerProfile";
import AssignWorkForm from "./AssignWorkForm/AssignWorkForm";
import DesignerWorks from "./DesignerWork/DesignerWork";
import Chat from "./Chat/Chat";
import Dashboard from "./views/Dashboard";
import AdminLayout from "./layouts/Admin";
import { redirect } from "react-router-dom";

function App() {
  const [currentUser] = useRecoilState(userState);
  const role = currentUser?.userRole;
  return (
    <BrowserRouter>
      <SmoothScroll />
      <Header />
      <Routes>
        <Route path="/chat" element={role=="user" || "designer"?<Chat />:(<Login/>)} />
        <Route path="designer/works" element={<DesignerWorks />} />
        <Route path="/assignWork/:desid" element={<AssignWorkForm />} />
        <Route path="/designer/:desid" element={<DesignerProfile />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/designerList" element={<DesignerList />} />
        <Route path="/registerUser" element={<RegisterFamily />} />
        <Route path="/register" element={<RegisterDesigner />} />
        <Route path="/products" element={<Products />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/restricted-page" element={<RestrictedPage />}></Route>
        <Route path="/pricing" element={<PricingPlan />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/project-details" element={<ProjectDetails />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/team-single" element={<TeamSingle />}></Route>
        <Route path="/aboutus" element={<About />}></Route>
        <Route path="/error" element={<NotFound />}></Route>
        <Route path="/blog-details" element={<BlogDetails />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/service-single" element={<ServiceSingle />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/projects" element={<Project />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/cookies-policy" element={<Cookies />}></Route>
        <Route path="/privacy-policy" element={<Privacy />}></Route>
        {/* <Route path="/admin/dashboard" element={<Dashboard />}></Route> */}
        <Route path="/admin/*" element={<AdminLayout />} /> 
        <Route path="/dashboard" element={<redirect to="/admin/dashboard" replace />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
