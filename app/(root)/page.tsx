import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta bg-gradient-to-r from-blue-600 to-cyan-400 p-6 rounded-xl shadow-lg text-white">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl font-bold">🔥 Get Interview-Ready with AI!</h2>
          <p className="text-lg opacity-90">
            Level up your game with real interview questions & instant feedback. No more guesswork, just results.
          </p>

          <Button asChild className="border border-white hover:bg-white hover:text-blue-600 transition-all max-sm:w-full">
            <Link href="/interview">🚀 Start Practicing Now</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-10">
        <h2 className="text-2xl font-semibold text-blue-600">📌 Your Interview Journey</h2>

        <div className="interviews-section bg-gray-100 p-4 rounded-lg shadow">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500">You haven't taken any interviews yet. Time to change that! 🚀</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-10">
        <h2 className="text-2xl font-semibold text-blue-600">🎯 Upcoming Interviews</h2>

        <div className="interviews-section bg-gray-100 p-4 rounded-lg shadow">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500">No interviews available yet. Stay tuned! 🔥</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
