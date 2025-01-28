import { useState } from "react";
import { useUserContext } from "@/contexts/UserContext";

const Login = () => {
  const [inUser, setInUser] = useState("");
  const [inPassword, setInPassword] = useState("");
  const { setUserId } = useUserContext();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ userName: inUser }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const { user_id } = await response.json();
      console.log("Logged in, userId:", user_id);
      setUserId(user_id);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleClick} className="flex flex-col gap-5 my-5">
      <input
        type="text"
        placeholder="Username"
        name="inUser"
        value={inUser}
        onChange={(e) => setInUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={inPassword}
        onChange={(e) => setInPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
