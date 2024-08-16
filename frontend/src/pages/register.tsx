import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUser();
  };

  const addUser = async () => {
    const newUser = {
      username,
      password,
    };
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (response.status !== 200) {
        setError(data.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-blue-400 p-10 rounded-2xl border-2 border-slate-700">
        <p className="text-2xl text-center pb-5">Sign up!</p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex gap-3 items-center">
            <span className="font-semibold">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="rounded-md grow border border-gray-400 p-2"
            />
          </label>

          <label className="flex gap-3 items-center">
            <span className="font-semibold">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="password"
              className="rounded-md grow border border-gray-400 p-2"
            />
          </label>
          {error && <p className="text-center text-red-600">{error}</p>}
          <button className="bg-slate-800 px-4 py-2 rounded-xl font-bold text-slate-50 mx-auto">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
