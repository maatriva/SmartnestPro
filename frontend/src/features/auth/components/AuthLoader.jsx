import Spinner from "../../../shared/UI/Spinner";

export default function AuthLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) text-(--text-dark)">
      <div className="flex flex-col items-center gap-4">
        <Spinner />

        <p className="font-bold text-xl animate-pulse">
          Loading Maatriva...
        </p>
      </div>
    </div>
  );
}