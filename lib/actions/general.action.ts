"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(({ role, content }) => `- ${role}: ${content}\n`)
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please return a JSON object with the following format:
        {
          "totalScore": <integer>,
          "categoryScores": [
            {"name": "Communication Skills", "score": <integer>, "comment": "<string>"},
            {"name": "Technical Knowledge", "score": <integer>, "comment": "<string>"},
            {"name": "Problem-Solving", "score": <integer>, "comment": "<string>"},
            {"name": "Cultural Fit", "score": <integer>, "comment": "<string>"},
            {"name": "Confidence and Clarity", "score": <integer>, "comment": "<string>"}
          ],
          "strengths": ["<string>", "<string>"],
          "areasForImprovement": ["<string>", "<string>"],
          "finalAssessment": "<string>"
        }
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
    });

    if (!object || !object.totalScore || !object.categoryScores) {
      throw new Error("Invalid AI response: Missing required fields");
    }

    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths || [],
      areasForImprovement: object.areasForImprovement || [],
      finalAssessment: object.finalAssessment || "No final assessment provided",
      createdAt: new Date().toISOString(),
    };

    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id) {
  const interview = await db.collection("interviews").doc(id).get();
  return interview.exists ? { id: interview.id, ...interview.data() } : null;
}

export async function getFeedbackByInterviewId(params) {
  const { interviewId, userId } = params;
  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() };
}

export async function getLatestInterviews(params) {
  const { userId, limit = 20 } = params;
  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getInterviewsByUserId(userId) {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
