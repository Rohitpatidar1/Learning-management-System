import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useEffect, useState, useMemo } from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";

function Profile() {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading }] =
    useUpdateUserMutation();

  const user = useMemo(() => data?.user || {}, [data]);

  useEffect(() => {
    if (data) {
      refetch();
      console.log("User Data:", data);
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  if (isLoading)
    return (
      <h1 className="text-center text-2xl font-semibold text-blue-500">
        Profile Loading...
      </h1>
    );

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
      await updateUser(formData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Heading */}
      <h1 className="font-bold text-4xl text-center text-blue-700 dark:text-blue-400 mb-12">
        Your Profile
      </h1>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 my-10">
        <div className="flex flex-col items-center">
          <Avatar className="h-36 w-36 md:h-44 md:w-44 mb-6 border-4 border-blue-300 dark:border-blue-700 shadow-lg">
            <AvatarImage
              src={user?.photoUrl || "default-profile.jpg"}
              alt="Profile Picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-6">
          <div className="text-lg">
            <h2 className="font-semibold text-gray-800 dark:text-gray-300">
              Name: <span className="font-normal">{user.name}</span>
            </h2>
          </div>
          <div className="text-lg">
            <h2 className="font-semibold text-gray-800 dark:text-gray-300">
              Email: <span className="font-normal">{user.email}</span>
            </h2>
          </div>
          <div className="text-lg">
            <h2 className="font-semibold text-gray-800 dark:text-gray-300">
              Role: <span className="font-normal capitalize">{user.role}</span>
            </h2>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-md transition duration-300">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl p-6 shadow-2xl">
              <DialogHeader>
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profile" className="text-right">
                    Profile Photo
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={updateUserHandler}
                  disabled={updateUserIsLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-full"
                >
                  {updateUserIsLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Please Wait
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-10">
          Your Enrolled Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {user.enrolledCourses?.length === 0 ? (
            <h1 className="text-gray-600 text-center col-span-full">
              You are not enrolled in any course.
            </h1>
          ) : (
            user.enrolledCourses?.map((course) => (
              <div
                key={course._id}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <Course course={course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
