// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Login = () => {
//   const [signupInput, setSignInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loginInput, setLoginInput] = useState({ email: "", password: "" });

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();
//   const [
//     loginUser,
//     {
//       data: loginData,
//       error: loginError,
//       isLoading: loginIsLoading,
//       isSuccess: loginIsSuccess,
//     },
//   ] = useLoginUserMutation();

//   const navigate = useNavigate();

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignInput((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setLoginInput((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleRegistration = async (type) => {
//     const inputData = type === "signup" ? signupInput : loginInput;
//     await (type === "signup" ? registerUser : loginUser)(inputData);
//   };

//   useEffect(() => {
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "Signup successfully");
//     }
//     if (registerError) {
//       toast.error(registerError.data?.message || "Signup failed");
//     }
//     if (loginIsSuccess && loginData) {
//       toast.success(loginData.message || "Login successfully");
//       navigate("/");
//     }
//     if (loginError) {
//       toast.error(loginError.data?.message || "Login failed");
//     }
//   }, [
//     registerIsSuccess,
//     registerData,
//     registerError,
//     loginIsSuccess,
//     loginData,
//     loginError,
//   ]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <Tabs defaultValue="Login" className="w-full max-w-md">
//         <TabsList className="grid grid-cols-2 bg-white shadow-sm rounded-lg mb-6 border border-gray-300">
//           <TabsTrigger
//             value="Signup"
//             className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:bg-blue-50 font-medium py-2 transition-all"
//           >
//             Signup
//           </TabsTrigger>
//           <TabsTrigger
//             value="Login"
//             className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:bg-blue-50 font-medium py-2 transition-all"
//           >
//             Login
//           </TabsTrigger>
//         </TabsList>

//         {/* Signup */}
//         <TabsContent value="Signup">
//           <Card className="bg-white shadow-md rounded-xl border border-gray-200">
//             <CardHeader>
//               <CardTitle className="text-blue-600 text-xl">Signup</CardTitle>
//               <CardDescription>Create your account</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={signupInput.name}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Enter name"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={signupInput.email}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Enter email"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={signupInput.password}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={registerIsLoading}
//                 onClick={() => handleRegistration("signup")}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {registerIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     please wait
//                   </>
//                 ) : (
//                   "Signup"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Login */}
//         <TabsContent value="Login">
//           <Card className="bg-white shadow-md rounded-xl border border-gray-200">
//             <CardHeader>
//               <CardTitle className="text-blue-600 text-xl">Login</CardTitle>
//               <CardDescription>Enter your credentials</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={loginInput.email}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="Enter email"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={loginInput.password}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={loginIsLoading}
//                 onClick={() => handleRegistration("login")}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {loginIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Login;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  // ✅ Email Validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.endsWith("@gmail.com");
  };

  // ✅ Password Validation
  const isValidPassword = (password) => {
    // min 6 chars, at least 1 number, 1 special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;

    // ✅ Email Validation
    if (!isValidEmail(inputData.email)) {
      toast.error(
        "Please enter a valid Gmail address (must end with @gmail.com)"
      );
      return;
    }

    // ✅ Password Validation
    if (!isValidPassword(inputData.password)) {
      toast.error(
        "Password must be at least 6 characters long, contain 1 number & 1 special character"
      );
      return;
    }

    await (type === "signup" ? registerUser : loginUser)(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successfully");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successfully");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login failed");
    }
  }, [
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginData,
    loginError,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Tabs defaultValue="Login" className="w-full max-w-md">
        <TabsList className="grid grid-cols-2 bg-white shadow-sm rounded-lg mb-6 border border-gray-300">
          <TabsTrigger
            value="Signup"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:bg-blue-50 font-medium py-2 transition-all"
          >
            Signup
          </TabsTrigger>
          <TabsTrigger
            value="Login"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:bg-blue-50 font-medium py-2 transition-all"
          >
            Login
          </TabsTrigger>
        </TabsList>

        {/* Signup */}
        <TabsContent value="Signup">
          <Card className="bg-white shadow-md rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-blue-600 text-xl">Signup</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="Login">
          <Card className="bg-white shadow-md rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-blue-600 text-xl">Login</CardTitle>
              <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
