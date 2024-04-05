import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { useState } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Message() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desc: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Message sent successfully!");
        toast.success("Message send successfully!");
      } else {
        console.error("Failed to send message");
        toast.error("Failde to send message!");

      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failde to send message!");
    }
  };

  return (
    <>
      <ToastContainer />
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[50%] w-[90%] lg:h-[65%] flex justify-center">
          <form className=" bg-white flex-col h-full lg:p-10 p-6 rounded-3xl lg:px-16 shadow-xl justify-center items-center flex " onSubmit={handleSubmit}>
            <div className="lg:text-6xl text-5xl font-extrabold flex-col text-center justify-center text-[#002259]">
              Message to Doctor
            </div>
            <div className="pt-6 pb-3 w-full">
              <div className="mb-1 ">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter Name"
                required
                shadow
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="pb-3 w-full">
              <div className="mb-1 ">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="text"
                placeholder="Enter email"
                required
                shadow
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="pb-3 w-full">
              <div className="mb-1 ">
                <Label htmlFor="phone" value="Phone Number" />
              </div>
              <TextInput
                id="phone"
                type="text"
                placeholder="Enter phone number"
                required
                shadow
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="pb-3 w-full">
              <div className="mb-1 ">
                <Label htmlFor="desc" value="Message" />
              </div>
              <Textarea
                id="desc"
                type="text"
                placeholder="Enter message"
                required
                shadow
                value={formData.desc}
                onChange={handleChange}
              />
            </div>

            <div className="flex text-white font-bold justify-center w-full">
              <div className="w-full pt-6 lg:flex gap-4">
                <button type="submit" className=" rounded-md w-full bg-[#F3B320] px-10 py-3">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Message;
