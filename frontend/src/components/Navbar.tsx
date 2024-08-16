import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedInUser, logoutUser } = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-blue-400 flex items-center justify-end border-b-2 border-slate-700">
      {!loggedInUser ? (
        <Link
          to="/login"
          className="bg-slate-800 p-2 rounded-xl font-bold text-slate-50 mr-6"
        >
          Log in
        </Link>
      ) : (
        <button
          className="bg-slate-800 p-2 rounded-xl font-bold text-slate-50 mr-6"
          onClick={logout}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Navbar;
