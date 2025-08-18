import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import FullPageLayout from "../hoc/FullPageLayout";
import { Link } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const firebaseErrorMessages: Record<string, string> = {
    "auth/invalid-email": "The email address is invalid.",
    "auth/user-not-found": "No account found with this email.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Please check your inbox.");
    } catch (err) {
      if (typeof err === "object" && err && "code" in err) {
        const code = (err as { code?: string }).code;
        setError(
          firebaseErrorMessages[code ?? ""] || "Failed to send reset email"
        );
      } else {
        setError("Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullPageLayout>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="text-destructive text-sm text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-success text-sm text-center">
                  {success}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/login">
                <Button type="button" variant="outline" className="w-full mt-2">
                  Go back to login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </FullPageLayout>
  );
}
