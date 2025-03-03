import { FastifyPluginCallback, FastifyReply } from "fastify";
import { IUserBody, IUserEmail } from "./interface/user.interface";
import { userResponseSchema, userBodySchema, userEmailSchema } from "./schemas/user.schemas";
import { successfulResponseSchema } from "./schemas/generic.schemas";
import { userService } from "../services/user-service";
import { authService } from "../services/auth-service";
import constants from "../config/constants";
import { IDeepseekBody } from "./interface/deepseek.interface";
import { deepseekGetAnswerRequestSchema, deepseekGetAnswerResponseSchema } from "./schemas/deepseek.schemas";
import axios from "axios";

export const deepseekController: FastifyPluginCallback = (server, options, done) => {
  // **Get authenticated user**

  // **User signup**
  server.post<{ Body: IDeepseekBody }>(
    "/getAnswer",
    { schema: { ...deepseekGetAnswerRequestSchema, ...deepseekGetAnswerResponseSchema } },
    async (request, reply) => {
      try {
        const { textInput } = request.body;
        const response = await axios.post(
          "http://127.0.0.1:11434/api/chat",
          {
            model: "deepseek-r1",
            messages: [{ role: "user", content: textInput }],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Deepseek response:", response.data);
        return reply.code(200).send({ textResponse: response.data });
      } catch (error) {
        console.log("error11111111", error);
        return reply.code(400).send({ error: error.message });
      }
    }
  );

  done();
};
