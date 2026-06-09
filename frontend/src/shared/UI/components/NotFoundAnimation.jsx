import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundAnimation() {
  return (
    <div className="float-container w-64 h-64 md:w-96 md:h-96 mb-6">
      <DotLottieReact
        src="https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json"
        loop
        autoplay
      />
    </div>
  );
}
