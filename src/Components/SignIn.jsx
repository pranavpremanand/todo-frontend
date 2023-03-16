import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../APIs/BaseURL";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState("");

  const handleCallbackResponse = async (response) => {
    try {
      const { data } = await baseUrl.post("/signin", {
        ...response,
        type: "google",
      });
      if (data) {
        localStorage.setItem('token',data.accessToken)
        toast("Signin successful", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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

  const doSignin = async (e) => {
    e.preventDefault();
    const form = { email: email, pass: pass };
    try {
      const { data } = await baseUrl.post("/signin", form);
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
        console.log(data)
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

  return (
    <div className="bg-gray-900 p-3 flex justify-center items-center min-h-screen">
      <div
        className="flex flex-col p-12 bg-white shadow-2xl rounded-xl
             z-10"
      >
        <form id="signin-form" onSubmit={doSignin}>
          <p className="ml-1 w-full underline font-semibold text-gray-600 text-lg uppercase text-start leading-snug">
            Signin
          </p>

          <div className="mt-5 mr-0 mb-0 ml-0 space-y-4">
            <div className="md:w-80 w-56">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 text-sm font-medium text-gray-600 absolute">
                Email
              </p>
              <input
                required
                placeholder=""
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
                name="email"
                type="text"
                className="border w-full placeholder-gray-400 focus:outline-none
                  focus:border-black p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
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
                required
                name="password"
                placeholder=""
                type="password"
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
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-2xl"
              />
              {setPassErr && (
                <small className="text-red-600 ml-1">{passErr}</small>
              )}
              <div className="mt-1">
                <button
                  type="submit"
                  className="w-full inline-block text-md font-medium text-center p-3 text-white bg-gray-900
                  rounded-2xl transition duration-200 hover:bg-gray-800 ease"
                >
                  Signin
                </button>
              </div>

              <div className="mt-4 h-8">
                <div id="g-div"></div>
              </div>
              <div className="mt-4 text-end">
                <a
                  className="cursor-pointer underline font-medium text-sm"
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
