'use server';

/**
 * @fileOverview An AI agent for generating dynamic advertisements for web-based products.
 *
 * - generateDynamicAd - A function that handles the advertisement generation process.
 * - GenerateDynamicAdInput - The input type for the generateDynamicAd function.
 * - GenerateDynamicAdOutput - The return type for the generateDynamicAd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import * as fs from 'fs';

const GenerateDynamicAdInputSchema = z.object({
  productName: z.string().describe('The name of the product to advertise.'),
  productCategory: z.string().describe('The category of the product.'),
  productDescription: z.string().describe('The description of the product.'),
  style: z.string().describe('The desired style for the advertisement (e.g., minimalist, bold, elegant).'),
  emotion: z.string().describe('The emotion the advertisement should evoke (e.g., excitement, trust, desire).'),
  slogan: z.string().optional().describe('An optional slogan to include in the advertisement.'),
  theme: z.string().optional().describe('The desired theme for the advertisement (e.g., futuristic, nature, vintage).'),
  photoDataBase64: z.string().optional().describe(
    "An image of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});

export type GenerateDynamicAdInput = z.infer<typeof GenerateDynamicAdInputSchema>;

const GenerateDynamicAdOutputSchema = z.object({
  adText: z.string().describe('The generated advertisement text.'),
  adImage: z.string().describe('The generated advertisement image as a data URI.'),
});

export type GenerateDynamicAdOutput = z.infer<typeof GenerateDynamicAdOutputSchema>;

export async function generateDynamicAd(input: GenerateDynamicAdInput): Promise<GenerateDynamicAdOutput> {
  return generateDynamicAdFlow(input);
}

const generateAdPrompt = ai.definePrompt({
  name: 'generateAdPrompt',
  input: {schema: GenerateDynamicAdInputSchema},
  output: {schema: GenerateDynamicAdOutputSchema},
  prompt: `You are an expert advertising copywriter and graphic designer. Your goal is to create compelling advertisements for web-based products.

  Based on the following product information and style/emotional guidelines, generate:
  1.  advertisement text that is attention-grabbing and persuasive.
  2.  a prompt for generating an image appropriate for the advertisement.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Product Description: {{{productDescription}}}
  Style: {{{style}}}
  Emotion: {{{emotion}}}
  {{#if slogan}}Slogan: {{{slogan}}}{{/if}}
  {{#if theme}}Theme: {{{theme}}}{{/if}}
  {{#if photoDataBase64}}Photo: {{media url=photoDataBase64}}{{/if}}

  Your output should include an "adText" field containing the advertisement text, and an "adImage" field containing a prompt to generate the image.
  Ensure the prompt provided in adImage is detailed enough to generate a relevant and visually appealing image. The model will use that prompt to generate the image.
  Consider the style, theme, and emotion when crafting the prompt.
  Ad Text:`, // Explicitly requesting the output to be a String
});

const generateDynamicAdFlow = ai.defineFlow(
  {
    name: 'generateDynamicAdFlow',
    inputSchema: GenerateDynamicAdInputSchema,
    outputSchema: GenerateDynamicAdOutputSchema,
  },
  async input => {
    const {output} = await generateAdPrompt(input);

    // Generate the image using ai.generate
    let imageResult;
    if (input.photoDataBase64) {
      imageResult = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: input.photoDataBase64}},
          {text: output?.adImage || `generate an image of ${input.productName} in a ${input.style} style that evokes ${input.emotion}`},
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
        },
      });
    } else {
      imageResult = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: output?.adImage || `generate an image of ${input.productName} in a ${input.style} style that evokes ${input.emotion}`,
      });
    }

    return {
      adText: output!.adText,
      adImage: imageResult!.media!.url,
    };
  }
);
