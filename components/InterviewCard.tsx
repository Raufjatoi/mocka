import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import DisplayTechIcons from "./DisplayTechicons";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96 text-white">
  <div className="card-interview bg-blue-800">
    <div>
      {/* Type Badge */}
      <div
        className={cn(
          "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-[#38bdf8] text-dark"
        )}
      >
        <p className="badge-text">{normalizedType}</p>
      </div>

      {/* Cover Image */}
      <Image
        src="/company.png"
        alt="cover-image"
        width={90}
        height={90}
        className="rounded-full object-fit size-[90px]"
      />

      {/* Interview Role */}
      <h3 className="mt-5 capitalize">{role} Interview</h3>

      {/* Date & Score */}
      <div className="flex flex-row gap-5 mt-3">
        <div className="flex flex-row gap-2">
          <Image src="/calender.png" width={22} height={22} alt="calendar" />
          <p>{formattedDate}</p>
        </div>
      </div>

      {/* Feedback or Placeholder Text */}
      <p className="line-clamp-2 mt-5">
        {feedback?.finalAssessment ||
          "You haven't taken this interview yet. Take it now to improve your skills."}
      </p>
    </div>

    <div className="flex flex-row justify-between">
      <DisplayTechIcons techStack={techstack}/>
      <Button className="btn-primary bg-sky-500 text-dark hover:bg-sky-600">
        <Link
          href={
            feedback
              ? `/interview/${interviewId}/feedback`
              : `/interview/${interviewId}`
          }
        >
          {feedback ? "Check Feedback" : "View Interview"}
        </Link>
      </Button>
    </div>
  </div>
</div>

  );
};

export default InterviewCard;
