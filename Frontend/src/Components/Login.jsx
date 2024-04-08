import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import background from "../assets/background.png";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });
      const data = await response.json();
      // Cek apakah login berhasil
      if (response.ok) {
        // Lakukan penyimpanan token dan role di sini
        // Contoh:
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id', data.id);
        console.log('Login berhasil ini id' , data.id);
        // Redirect sesuai dengan role
        if (data.role === 'admin') {
          window.location.href = '/admin_dashboard';
        } else {
          window.location.href = '/'; // Ganti dengan rute untuk pengguna biasa
        }
      } else {
        setError(data.message); // Menampilkan pesan kesalahan dari API
      }
    } catch (error) {
      setError('Terjadi kesalahan saat melakukan login');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[40%] w-[60%] h-[50%] flex justify-center text-center">
          <div className=" bg-white flex-col h-full p-10 rounded-3xl lg:px-16 shadow-xl">
            <div className="lg:text-7xl text-6xl font-extrabold lg:flex justify-center text-center text-[#002259]">
              Login ETD
            </div>
            <form className="flex justify-start flex-col gap-4 text-start pt-10 text-xl" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 ">
                  <Label htmlFor="email2" value="Username" />
                </div>
                <TextInput
                  id="email2"
                  type="email"
                  placeholder="Masukkan username"
                  required
                  shadow
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password2" value="Password" />
                </div>
                <TextInput
                  id="password2"
                  type="password"
                  placeholder="Masukkan password"
                  required
                  shadow
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button className="bg-[#F3B320] mt-6 rounded-md" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
