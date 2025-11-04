import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';


const google = createGoogleGenerativeAI();
const anthropic = createAnthropic();
const openai = createOpenAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant.",
      prompt: "What is PSU?"
    });

    const { steps: openaiSteps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-3.5-turbo"),
      system: "You are a helpful assistant.",
      prompt: "What is PSU?"
    });

    const { steps: anthropicSteps } = await step.ai.wrap("anthropic-generate-text", generateText, {
      model: anthropic("claude-haiku-4-5"),
      system: "You are a helpful assistant.",
      prompt: "What is PSU?"
    });

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps
    }
  }
);