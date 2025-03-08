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

  // ✅ useMemo to prevent unnecessary recalculations
  const user = useMemo(() => data?.user || {}, [data]);

  // ✅ Log data only once when it changes
  useEffect(() => {
    if (data) {
      refetch();
      console.log("User Data:", data);
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file); // Store actual file instead of preview URL
    }
  };

  if (isLoading) return <h1>Profile Loading...</h1>;

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto); // ✅ Ensure it's a File
      }

      await updateUser(formData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "default-profile.jpg"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900">
              Name:
              <span className="font-normal text-gray-700 ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900">
              Email:
              <span className="font-normal text-gray-700 ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900">
              Role:
              <span className="font-normal text-gray-700 ml-2">
                {user.role}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black shadow-lg rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-black">Edit Profile</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-gray-700">
                    Name
                  </Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3 border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profile" className="text-right text-gray-700">
                    Profile
                  </Label>
                  <Input
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className="col-span-3 border-gray-300"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses You Are Enrolled In</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses?.length === 0 ? (
            <h1 className="text-gray-600">
              You are not enrolled in any course.
            </h1>
          ) : (
            user.enrolledCourses?.map((course) => (
              <div
                key={course._id}
                className="p-4 border rounded-lg shadow-lg bg-white"
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
