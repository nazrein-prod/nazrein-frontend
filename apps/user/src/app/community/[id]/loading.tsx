import { Loader } from "lucide-react";

export default function CommunityVideoLoading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <div className="animate-spin flex items-center justify-center">
        <Loader />
      </div>
    </div>
  );
}
