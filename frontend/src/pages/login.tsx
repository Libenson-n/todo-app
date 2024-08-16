import { useState } from "react";
import { useContext } from "react";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(LoggedInUserContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchUser();
  };

  const fetchUser = async () => {
    const user = {
      username,
      password,
    };
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      const userId = data?.foundUser._id;

      login(userId);
      navigate("/");
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-blue-400 p-10 rounded-2xl border-2 border-slate-700">
        <p className="text-2xl text-center pb-5">Sign in</p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex gap-3 items-center">
            <span className="font-semibold">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="rounded-md grow border border-gray-400 p-2"
              required
            />
          </label>
          <label className="flex gap-3 items-center">
            <span className="font-semibold">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="rounded-md grow border border-gray-400 p-2"
              required
            />
          </label>
          <button className="bg-slate-800 px-4 py-2 rounded-xl font-bold text-slate-50 mx-auto">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
