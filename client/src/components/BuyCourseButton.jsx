import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Function to Load Razorpay Script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function BuyCourseButton({ courseId }) {
  const navigate = useNavigate();
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      console.log("Original courseId:", courseId, "Type:", typeof courseId);
      await createCheckoutSession({ courseId });
      console.log("Sent courseId:", courseId);
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("Something went wrong. Try again!");
    }
  };

  useEffect(() => {
    const handlePayment = async () => {
      if (isSuccess && data?.orderId) {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("Razorpay SDK failed to load.");
          return;
        }

        const options = {
          key: data.key, // ✅ Razorpay API Key
          amount: data.amount, // Amount in paise
          currency: data.currency,
          order_id: data.orderId,
          name: "Your Course Platform",
          description: "Purchase Course",
          handler: function (response) {
            console.log("Payment Success:", response);
            toast.success("Payment Successful!");
            navigate(`/course-progress/${courseId}`); // ✅ Correct courseId usage
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open(); // ✅ Open Razorpay modal
      }
    };

    handlePayment();

    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout");
    }
  }, [isSuccess, data, isError, error, courseId]); // ✅ Added `courseId` in dependencies

  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={purchaseCourseHandler}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait</span>
          </>
        ) : (
          "Purchase Course"
        )}
      </Button>
    </div>
  );
}

export default BuyCourseButton;
