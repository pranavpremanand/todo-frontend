import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../APIs/BaseURL";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const doSignup = async (e) => {
    e.preventDefault();
    const form = {
      name: name,
      email: email,
      pass: pass,
    };
    try {
      const { data } = await baseUrl.post("/signup", form);
      if (data.message) {
        toast(data.message, {
          icon: "⚠️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast("Signup successful", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        localStorage.setItem('token',data.accessToken)
        navigate("/");
      }
    } catch (err) {
      toast("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const handleCallbackResponse = async (response) => {
    try {
      const { data } = await baseUrl.post("/signup", {
        type: "google",
        ...response,
      });
      if (data.message) {
        toast(data.message, {
          icon: "⚠️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast("Signin successful", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        localStorage.setItem("token",data.accessToken);
        navigate("/");
      }
    } catch (err) {
      toast("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        "836799488267-ik6pcnheni24a290k3k4kt9knsjc1mq4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("g-div"), {
      theme: "outline",
      size: "medium",
    });
  }, []);

  return (
    <div className="bg-gray-900 p-3 flex justify-center items-center min-h-screen">
      <div
        className="flex flex-col p-12 bg-white shadow-2xl rounded-xl
          z-10"
      >
        <form id="signup-form" onSubmit={doSignup}>
          {/* <div className="flex justify-between px-1"> */}
          <p className="ml-1 w-full underline font-semibold text-gray-600 text-lg uppercase text-start leading-snug">
            Signup
          </p>
          {/* <p className="w-full font-semibold text-grey-500 text-md uppercase text-start leading-snug">
            Make Your Day!
          </p>
          </div> */}
          <div className="mt-5 mr-0 mb-0 ml-0 space-y-4">
            <div className="md:w-80 w-56">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-sm text-gray-600 absolute">
                Full Name
              </p>
              <input
                onChange={(e) => {
                  if (
                    e.target.value.length !== 0 &&
                    e.target.value.length < 3
                  ) {
                    setNameErr("Enter a valid name");
                  } else {
                    setName(e.target.value);
                    setNameErr("");
                  }
                }}
                required
                placeholder=""
                type="text"
                name="name"
                className="border w-full placeholder-gray-400 focus:outline-none
                  focus:border-black p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-2xl"
              />
              {nameErr && (
                <small className="text-red-600 ml-1">{nameErr}</small>
              )}
            </div>
            <div className="">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-sm text-gray-600 absolute">
                Email
              </p>
              <input
                name="email"
                onChange={(e) => {
                  const regEmail =
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (
                    e.target.value.length > 0 &&
                    !regEmail.test(e.target.value)
                  ) {
                    setEmailErr("Enter a valid email address");
                  } else {
                    setEmail(e.target.value);
                    setEmailErr("");
                  }
                }}
                required
                placeholder=""
                type="text"
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-2xl"
              />
              {emailErr && (
                <small className="text-red-600 ml-1">{emailErr}</small>
              )}
            </div>
            <div className="">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 text-sm font-medium text-gray-600 absolute">
                Password
              </p>
              <input
                name="password"
                onChange={(e) => {
                  if (
                    e.target.value.length !== 0 &&
                    e.target.value.length < 6
                  ) {
                    setPassErr("Password must be atleast 6 characters");
                  } else {
                    setPass(e.target.value);
                    setPassErr("");
                  }
                }}
                required
                placeholder=""
                type="password"
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-2xl"
              />
              {passErr && (
                <small className="text-red-600 ml-1">{passErr}</small>
              )}
            </div>
            <div className="">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 text-sm font-medium text-gray-600 absolute">
                Confirm Password
              </p>
              <input
                name="confirm-password"
                onChange={(e) => {
                  if (e.target.value !== pass && e.target.value.length > 0) {
                    setConfirmPassErr("Both passwords must be same");
                  } else {
                    setConfirmPass(e.target.value);
                    setConfirmPassErr("");
                  }
                }}
                required
                placeholder=""
                type="password"
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-2xl"
              />
              {setConfirmPassErr && (
                <small className="text-red-600 ml-1">{confirmPassErr}</small>
              )}
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full inline-block text-md font-medium text-center p-3 text-white bg-gray-900
                  rounded-2xl transition duration-200 hover:bg-gray-800 ease"
                >
                  Signup
                </button>
              </div>
            </div>
            <div className="mt-4 h-8">
              <div id="g-div"></div>
            </div>
            <div className="mt-3 text-end">
              <a
                className="cursor-pointer underline font-medium text-sm"
                onClick={() => navigate("/signin")}
              >
                Signin here
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
