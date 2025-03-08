import { School, Menu, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import DarkMode from "@/DarkModeo";
import { Link, useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "@/features/api/authapi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((Store) => Store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser(); // ✅ Ensure API is awaited
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      user.photoUrl ||
                      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="myLearning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="Profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user.role === "instructure" ? (
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                ) : (
                  ""
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="px-4 py-2 bg-black text-white hover:bg-gray-800"
                onClick={() => navigate("/login")}
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>

        {/* Mobile Navbar */}
      </div>
      <div className="md:hidden flex items-center gap-4">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-900 flex flex-col p-4">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-black dark:text-white">
            E-learning
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        {/* Separator */}
        <div className="border-b border-gray-300 dark:border-gray-700 my-2" />

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 text-black dark:text-white">
          <span className="cursor-pointer hover:text-gray-500">
            My Learning
          </span>
          <span className="cursor-pointer hover:text-gray-500">
            Edit Profile
          </span>
          <span className="cursor-pointer hover:text-red-500">Log Out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter className="flex justify-center">
            <SheetClose asChild>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-900"
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}

        {/* Footer */}
      </SheetContent>
    </Sheet>
  );
};
