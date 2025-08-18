import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import DashboardLayout from "../hoc/DashboardLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "The current password is incorrect.",
  "auth/wrong-password": "The current password is incorrect.",
  "auth/weak-password":
    "The new password is too weak. Please choose a stronger one.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/requires-recent-login":
    "Please log in again before changing your password.",
  "auth/user-mismatch": "User mismatch. Please try again.",
  "auth/user-not-found": "User not found. Please log in again.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  // Add more as needed
};
function MyAccountPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setFirebaseError(null);
    setSuccess(null);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        setFirebaseError("No user is currently logged in.");
        return;
      }
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      setSuccess("Password updated successfully!");
      reset();
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      console.log(JSON.stringify(error, null, 2));
      let message = "Failed to update password.";
      if (error && typeof error === "object" && "code" in error) {
        message =
          firebaseErrorMessages[error.code as string] ||
          error.message ||
          message;
      } else if (error && typeof error === "object" && "message" in error) {
        message = error.message;
      }
      setFirebaseError(message);
    }
  };

  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "My Account", isCurrent: true }]}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3 grid-cols-1"
      >
        <div className="aspect-video rounded-xl p-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold">Update Password</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Change your account password.
            </p>
          </div>
          <div className="">
            <div className="grid gap-3">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter your current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                disabled={isSubmitting}
              />
              {errors.currentPassword && (
                <span className="text-destructive text-xs">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <div className="grid gap-3 mt-4">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                disabled={isSubmitting}
              />
              {errors.newPassword && (
                <span className="text-destructive text-xs">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div className="grid gap-3 mt-4">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className="text-destructive text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            {firebaseError && (
              <div className="text-destructive text-sm mt-4">
                {firebaseError}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm mt-4">{success}</div>
            )}
            <div className="mt-6">
              <Button type="submit" className="" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default MyAccountPage;
