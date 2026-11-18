import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";

export default function App() {
  return (
    <SmoothScrollProvider>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </SmoothScrollProvider>
  );
}
