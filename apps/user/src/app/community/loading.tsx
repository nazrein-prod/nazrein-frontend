import { Loader } from "lucide-react";

export default function CommunityPageLoading() {
  return (
    <div className="flex h-dvh w-full animate-spin items-center justify-center">
      <Loader />
    </div>
  );
}
