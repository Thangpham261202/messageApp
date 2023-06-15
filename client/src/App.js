import Dashboard from "./modules/Dashboard";
import Form from "./modules/Form/index";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return children;
    } else {
      return <Navigate to="/user/login" />;
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/user/login" element={<Form isSignInPage={true} />} />
      <Route path="/user/register" element={<Form isSignInPage={false} />} />
    </Routes>
  );
}
export default App;
