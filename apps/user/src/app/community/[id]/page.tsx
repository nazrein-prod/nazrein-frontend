import { VideoDetails } from "./_components/VideoDetails";
import { VideoTimeline } from "./_components/VideoTimeline";

const videoData = {
  snippet: {
    publishedAt: "2012-10-01T15:27:35Z",
    channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
    title: "Your Body Language May Shape Who You Are | Amy Cuddy | TED",
    description:
      "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        width: 480,
        height: 360,
      },
      standard: {
        url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/sddefault.jpg",
        width: 640,
        height: 480,
      },
      maxres: {
        url: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
        width: 1280,
        height: 720,
      },
    },
    channelTitle: "TED",
  },
};

const historyData = [
  {
    date: "2024-01-15T10:30:00Z",
    type: "title",
    previousValue: "Body Language Shapes Who You Are | Amy Cuddy | TED",
    currentValue: "Your Body Language May Shape Who You Are | Amy Cuddy | TED",
    reason: "Title optimization for better engagement",
  },
  {
    date: "2023-08-22T14:20:00Z",
    type: "thumbnail",
    previousValue: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/old-thumb.jpg",
    currentValue: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
    reason: "Updated thumbnail for better click-through rate",
  },
  {
    date: "2023-03-10T09:15:00Z",
    type: "title",
    previousValue: "Power Posing: Body Language Affects Confidence | Amy Cuddy",
    currentValue: "Body Language Shapes Who You Are | Amy Cuddy | TED",
    reason: "Aligned with TED branding guidelines",
  },
  {
    date: "2022-11-05T16:45:00Z",
    type: "thumbnail",
    previousValue: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/old-thumb2.jpg",
    currentValue: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/old-thumb.jpg",
    reason: "A/B testing different thumbnail designs",
  },
];

export default function VideoInfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoDetails video={videoData} />
          </div>
          <div className="lg:col-span-1">
            <VideoTimeline history={historyData} />
          </div>
        </div>
      </div>
    </div>
  );
}
