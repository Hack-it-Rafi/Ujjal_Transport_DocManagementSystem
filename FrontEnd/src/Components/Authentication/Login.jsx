import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import logo from "/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [success, setSuccess] = useState("");
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result.user.email);
        const myUser = { email };
        console.log(myUser);
        setSuccess("Login success");
        Swal.fire({
          title: "Login Successful!",
          text: "Enjoy Exploring!",
          icon: "success",
          confirmButtonText: "Continue",
        });
        axios
          .post("http://localhost:8000/api/v1/jwt", myUser, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              navigate("/home/transportList");
            }
          })
          .catch((error) => {
            console.error(error);
            setSuccess(error.message);
          });
      })
      .catch((error) => {
        console.error(error);
        setSuccess(error.message);
      });
  };

  return (
    <div>
      <div className=""></div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center flex justify-center w-1/2 lg:text-left">
            <img className="w-2/3" src={logo} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>

              {success && <p className="text-red-600">{success}</p>}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;