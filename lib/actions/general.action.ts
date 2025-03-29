import { db } from "@/firebase/admin";

export async function getInterviewByUserId(userId: string): Promise<Interview[]> {
  const interviewsSnapshot = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  if (interviewsSnapshot.empty) {
    return []; 
  }

  return interviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[]> {
  const { userId, limit = 10 } = params;

  const interviewsSnapshot = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
   .where('finalized', '==', true)
   .where('userId', '!=', userId)
   .limit(limit)
    .get();

  if (interviewsSnapshot.empty) {
    return []; 
  }

  return interviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
    const interviewsSnapshot = await db
      .collection('interviews')
      .doc(id)
      .get();

    return interviewsSnapshot.data() as Interview | null; 
}  