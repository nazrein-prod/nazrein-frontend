import { Loader } from "lucide-react";

export default function CommunityPageLoading() {
  return (
    <div className="animate-spin h-dvh w-full flex items-center justify-center">
      <Loader />
    </div>
  );
}
