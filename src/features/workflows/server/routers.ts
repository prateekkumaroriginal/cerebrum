import { PAGINATION } from "@/constants";
import type { Connection, Node } from "@/generated/prisma/client";
import { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure
    .mutation(({ ctx }) => {
      return prisma.workflow.create({
        data: {
          name: generateSlug(3),
          userId: ctx.auth.user.id,
          nodes: {
            create: {
              name: NodeType.INITIAL,
              type: NodeType.INITIAL,
              position: { x: 0, y: 0 }
            }
          }
        }
      });
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.cuid()
    }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          userId: ctx.auth.user.id,
          id: input.id
        }
      });
    }),
  updateName: protectedProcedure
    .input(z.object({
      id: z.cuid(),
      name: z.string().min(2)
    }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id
        },
        data: {
          name: input.name
        }
      });
    }),
  getOne: protectedProcedure
    .input(z.object({
      id: z.cuid()
    }))
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id
        },
        include: {
          nodes: true,
          connections: true
        }
      });

      const nodes = getCompatibleNodes(workflow.nodes);
      const edges = getCompatibleEdges(workflow.connections);

      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges
      }
    }),
  getMany: protectedProcedure
    .input(z.object({
      page: z.number().min(1).default(PAGINATION.DEFAULT_PAGE),
      pageSize: z
        .number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE),
      search: z.string().default("")
    }))
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: {
            updatedAt: "desc"
          },
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        })
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        page,
        pageSize,
        items,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    })
});

const getCompatibleNodes = (nodes: Node[]) => (
  nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position as { x: number, y: number },
    data: (node.data as Record<string, unknown>) || {}
  }))
)

const getCompatibleEdges = (connections: Connection[]) => (
  connections.map((connection) => ({
    id: connection.id,
    source: connection.fromNodeId,
    target: connection.toNodeId,
    sourcehandle: connection.fromOutput,
    targetHandle: connection.toInput
  }))
);