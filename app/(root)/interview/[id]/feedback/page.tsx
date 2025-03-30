import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="section-feedback bg-[#0a2540] text-white p-6 rounded-lg">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold text-[#38bdf8]">
          Feedback on the Interview -
          <span className="capitalize"> {interview.role} Interview</span>
        </h1>
      </div>

      <div className="flex flex-row justify-center mt-4">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.png" width={22} height={22} alt="star" />
            <p>
              Overall Impression: 
              <span className="text-[#38bdf8] font-bold"> {feedback?.totalScore}</span>/100
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Image src="/calender.png" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-[#38bdf8] my-4" />

      <p className="text-[#ffffffb3]">{feedback?.finalAssessment}</p>

      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-[#38bdf8] font-semibold">Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold text-[#ffffff]">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p className="text-[#ffffffb3]">{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-[#38bdf8] font-semibold">Strengths</h3>
        <ul className="list-disc pl-5">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index} className="text-[#ffffffb3]">{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-[#38bdf8] font-semibold">Areas for Improvement</h3>
        <ul className="list-disc pl-5">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index} className="text-[#ffffffb3]">{area}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row gap-4 mt-6">
        <Button className="flex-1 bg-[#38bdf8] text-black hover:bg-[#0284c7] py-2 rounded-md">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Back to Dashboard
            </p>
          </Link>
        </Button>

        <Button className="flex-1 bg-[#38bdf8] text-black hover:bg-[#0284c7] py-2 rounded-md">
          <Link href={`/interview/${id}`} className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;