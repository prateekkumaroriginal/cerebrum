import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "prateek@gmail.com"
      }
    });
    return {
      success: true,
      message: "Job Queued"
    }
  }),
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai"
    });

    return {
      success: true,
      message: "Job Queued"
    }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;