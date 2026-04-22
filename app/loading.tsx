import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full inset-0">
      <Loader className="animate-spin" size={50} />
    </div>
  );
}
