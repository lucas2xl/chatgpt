import openai from './chatgpt'

export default async function query(prompt: string, chatId: string, model: string): Promise<string> {
  try {
    const res = await openai.createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return res.data.choices[0].text!

  } catch (error) {
    return `ChatGPT was unable to find an answer fot that! (Error: ${error})`
  }
}