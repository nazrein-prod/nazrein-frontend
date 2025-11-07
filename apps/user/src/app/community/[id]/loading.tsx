import { Loader } from "lucide-react";

export default function CommunityVideoLoading() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="flex animate-spin items-center justify-center">
        <Loader />
      </div>
    </div>
  );
}
