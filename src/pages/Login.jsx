import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { addUser } from "../redux/services/authSlice";
import { blueGrey } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { BiSquare } from "react-icons/bi";
import { BiSolidSquare } from "react-icons/bi";
import LoginImg from "/public/login.svg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    initialValues: {
      email: "admin@gmail.com",
      password: "asdffdsa",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 7 ? "Password must have at least 8 letters" : null,
    },
  });

  return (
    <div className=" w-full bg-[var(--sidebar-color)] flex justify-center items-center h-screen">
      <div className="z-10 md:basis-1/2 lg:basis-2/5 bg-[var(--sidebar-color)] h-full flex justify-center items-center">
        <img
          src={LoginImg}
          className="md:w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="relative md:basis-1/2 lg:basis-1/3 bg-[var(--base-color)] h-full">
        <div className="glass-login w-full h-full flex justify-center items-center">
          <form
            onSubmit={form.onSubmit(async (values) => {
              console.log("value", values);
              try {
                const data = await login(values);
                console.log(data?.data?.user?.id);
                console.log(data);

                dispatch(addUser({user: data?.data?.user, token: data?.data?.token }));
                if (data?.data?.token) {
                  nav("/");
                }
              } catch (error) {
                console.log(error);
              }
            })}
            className="	w-[400px] p-7 flex flex-col gap-2 "
          >
            <h2 className="font-['Genos'] text-[40px] text-[var(--secondary-color)] font-bold mb-3">
              MMS
            </h2>
            <p className=" text-[24px] font-semibold text-white">
              Welcome Back
            </p>
            <p className="text-[15px] font-medium text-[var(--font-color)]">
              {" "}
              Welcome Back!{" "}
              <span className=" text-[var(--secondary-color)]">
                {" "}
                Please enter your details{" "}
              </span>
            </p>

            <label htmlFor="" className=" text-[16px] text-white font-medium">
              Email
            </label>
            <TextInput
              {...form.getInputProps("email")}
              withAsterisk
              placeholder="Enter your Email..."
              className=" text-[var(--secondary-color)] bg-[var(--base-color)] border-2 rounded-[5px] border-[var(--border-color)]"
            />
            <label htmlFor="" className=" text-[16px] text-white font-medium">
              Password
            </label>

            <PasswordInput
              {...form.getInputProps("password")}
              withAsterisk
              placeholder="Enter your Password..."
              className=" text-[var(--secondary-color)] bg-[var(--base-color)] border-2 rounded-[5px] border-[var(--border-color)]"
            />
            <div className=" flex gap-4 items-center">
              <div className=" flex justify-start items-center gap-2">
                <Checkbox
                  {...label}
                  icon={<BiSquare />}
                  checkedIcon={<BiSolidSquare />}
                  sx={{
                    color: blueGrey[100],
                    "&.Mui-checked": {
                      color: grey[300],
                    },
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <p className="text-[12px] text-white font-medium cursor-pointer">
                  Remember me
                </p>
              </div>

              <Link to={"/register"}>
                <p className="text-[12px] text-[var(--font-color)] font-medium cursor-pointer">
                  Forget Password
                </p>
              </Link>
            </div>
            <button
              disabled={isLoading && true}
              type="submit"
              className=" w-full h-[40px] font-semibold text-[16px] myBlueBtn"
            >
              {isLoading ? (
                <div className=" flex justify-center items-center gap-2">
                  <Loader color="white" size="xs" />
                  <span>Loading....</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
