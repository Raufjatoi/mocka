// rafce
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6'>
        <h2> Get Interview Ready with AI-powered Practice & feedbacks </h2>
        <p className='text-lg'> practice on real interview questions and get a instant feedback </p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start an Interview</Link>
        </Button>
        <Image src='/robot.png' alt="robot" width={400} height={400} className='max-sm:hidden'></Image>
      </div> 
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2> Your Interviws </h2>
      <div className='interviews-section'>
        {/*<p> you haven&apos;'t taken any interviews yet </p>*/}
        {dummyInterviews.map((interview)=> (
          <InterviewCard {...interview} key={interview.id} />
        ))}
      </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2> Take an Interview </h2>  
      <div className="interviews-section">
      {dummyInterviews.map((interview)=> (
          <InterviewCard {...interview} key={interview.id} />
        ))}
      </div>
    </section>
    </>
  )
}

export default page