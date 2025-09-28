import { School, Menu } from "lucide-react";
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
import { useEffect } from "react";
import { toast } from "sonner";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useSelector } from "react-redux";
import { Separator } from "@radix-ui/react-dropdown-menu";

function Navbar() {
  const { user } = useSelector((Store) => Store.auth);
  const [logoutUser, { data, isSuccess, isError }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully.");
      navigate("/login");
    } else if (isError) {
      toast.error("An error occurred while logging out.");
    }
  }, [isSuccess, isError, data, navigate]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 shadow-md">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
        <div className="flex items-center gap-2">
          <School size={"30"} className="text-indigo-600" />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl text-gray-800 dark:text-white">
              E-Learning
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
                <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/myLearning"
                      className="text-gray-800 dark:text-white blink-on-hover"
                    >
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="text-gray-800 dark:text-white blink-on-hover"
                    >
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={logoutHandler}
                    className="text-red-500 dark:text-red-400"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => navigate("/admin/dashboard")}
                      className="text-indigo-600 dark:text-indigo-400"
                    >
                      Dashboard
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="hover:bg-indigo-100 text-gray-800 dark:text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white">
          E-learning
        </h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="outline"
        >
          <Menu className="text-gray-800 dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4 bg-white dark:bg-gray-900 p-6">
        <SheetHeader className="flex items-center justify-between mb-4">
          <SheetTitle className="text-2xl text-gray-800 dark:text-white">
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mt-2" />
        <nav className="flex flex-col space-y-4 mt-4">
          <Link
            to="/myLearning"
            className="text-lg text-gray-800 dark:text-white blink-on-hover"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-lg text-gray-800 dark:text-white blink-on-hover"
          >
            Edit Profile
          </Link>
          <button
            onClick={logoutHandler}
            className="text-lg text-left text-red-500 dark:text-red-400"
          >
            Log out
          </button>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button
                onClick={() => navigate("/admin/dashboard")}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
