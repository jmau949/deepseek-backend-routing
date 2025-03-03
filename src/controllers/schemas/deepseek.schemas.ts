import { FastifySchema } from "fastify";

export const deepseekGetAnswerRequestSchema = {
  body: {
    type: "object",
    required: ["textInput"],
    properties: {
      textInput: { type: "string", minLength: 1 }, // Ensures a non-empty string
    },
  },
};

export const deepseekGetAnswerResponseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        textResponse: { type: "string" },
      },
      required: ["textResponse"],
    },
  },
};
