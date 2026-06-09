import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({
  onSuccess,
  onError,
}) {
  return (
    <div className="mt-6 flex justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}