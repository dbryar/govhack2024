import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { config } from "@/config";

export class LangChainService {
  private openAIClient: OpenAI;
  private messageChain: ChatCompletionMessageParam[] = [];

  constructor(
    system: string,
    messages: ChatCompletionMessageParam[],
    private model = config.openrouter.model
  ) {
    this.openAIClient = new OpenAI({
      apiKey: config.openrouter.key,
      baseURL: config.openrouter.url,
    });
    this.messageChain = [
      {
        role: "system",
        content: system,
      },
      ...messages,
    ];
  }

  public async call(): Promise<string | null> {
    const response = await this.openAIClient.chat.completions.create({
      model: this.model,
      messages: this.messageChain,
    });
    return response.choices[0].message.content;
  }
}
