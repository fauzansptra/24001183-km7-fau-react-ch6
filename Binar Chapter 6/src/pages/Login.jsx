import { useState } from "react";
import axios from "axios";
import Notification from "../components/Notifictaion";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); // Initialize as useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      console.log(password);

      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password }
      );
      console.log(response);

      if (response.data.isSuccess) {
        const token = response.data.data.token;
        const username = response.data.data.username;

        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        setNotification({
          type: "success",
          message: response.data.message || "Succesfully Login",
          description: "you are now redirect to home page",
        });

        setTimeout(() => {
          navigate("/"); // replace "/target-path" with your desired route
          navigate(0);
        }, 2000);
      } else {
        ("masuk sini g");
      }
    } catch (error) {
      // console.log(error.data.response.message);
      setNotification({
        type: "error",
        message: error.response.data.message || "An error occured",
        description: "please try again",
      });
    }
  };

  // setTimeout()=>{}
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            decription={notification.decription}
            onClose={""}
          />
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleLogin}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state with the new value
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state with the new value
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
