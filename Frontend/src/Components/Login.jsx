import { Button, Label, TextInput } from "flowbite-react";
import background from "../assets/background.png";
import MainNavbar from "./MainNavbar";

function Login() {
  return (
    <>
      <MainNavbar/>
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
                  <Label htmlFor="email2" value="Username" />
                </div>
                <TextInput
                  id="email2"
                  type="email"
                  placeholder="Masukkan username"
                  required
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password2" value="Password" />
                </div>
                <TextInput id="password2" type="password" placeholder="Masukkan password" required shadow />
              </div>

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
