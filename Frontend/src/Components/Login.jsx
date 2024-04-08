import { Button, Label, TextInput } from "flowbite-react";
import background from "../assets/background.png";
import MainNavbar from "./MainNavbar";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, role, isAuthenticated } = useAuth();


   // Jika pengguna sudah login, arahkan ke halaman yang sesuai berdasarkan rolenya
   if (isAuthenticated) {
    return role === "admin" ? <Navigate to="/admin_dashboard" /> : <Navigate to="/" />;
  }

  const handleLogin = async () => {
    try {
      // Call your authentication API
      const response = await fetch("https://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      const { token, role } = await response.json();
      login(token, role);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[40%] w-[60%] h-[50%] flex justify-center text-center">
          <div className=" bg-white flex-col h-full p-10 rounded-3xl lg:px-16 shadow-xl">
            <div className="lg:text-7xl text-6xl font-extrabold lg:flex justify-center text-center text-[#002259]">
              Login ETD
            </div>
            <form className="flex justify-start flex-col gap-4 text-start pt-10 text-xl">
              <div>
                <div className="mb-2 ">
                  <Label htmlFor="email2" value="Email" />
                </div>
                <TextInput
                  id="email2"
                  placeholder="Masukkan Email"
                  required
                  shadow
                  type="text"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password2" value="Password" />
                </div>
                <TextInput
                  id="password2"
                  placeholder="Masukkan password"
                  required
                  shadow
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button onClick={handleLogin} className="bg-[#F3B320] mt-6 rounded-md" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
