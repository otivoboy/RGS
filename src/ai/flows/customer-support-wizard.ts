'use server';

/**
 * @fileOverview Customer support wizard AI agent.
 *
 * - customerSupportWizard - A function that handles customer inquiries and provides relevant information, offers, or discounts.
 * - CustomerSupportInput - The input type for the customerSupportWizard function.
 * - CustomerSupportOutput - The return type for the customerSupportWizard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerSupportInputSchema = z.object({
  customerInquiry: z
    .string()
    .describe('The customer inquiry or question.'),
  customerName: z.string().describe('The name of the customer.'),
  orderHistory: z
    .string()
    .optional()
    .describe('The past order history of the customer, if any.'),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  response: z.string().describe('The response to the customer inquiry, including relevant information, offers, or discounts.'),
  suggestedAction: z.string().describe('Suggested action for the agent to take, e.g., apply a discount, offer a refund, etc.'),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

export async function customerSupportWizard(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
  return customerSupportWizardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSupportWizardPrompt',
  input: {schema: CustomerSupportInputSchema},
  output: {schema: CustomerSupportOutputSchema},
  prompt: `You are a customer support wizard for Rwathia Gadget Store. Your goal is to help the customer and increase satisfaction and sales conversions.

  You will analyze the customer inquiry and:
  - Provide a helpful and informative response.
  - Suggest a relevant offer or discount, if appropriate.
  - Suggest a specific action for the agent to take.

  Here is the customer information:
  Customer Name: {{{customerName}}}
  Inquiry: {{{customerInquiry}}}
  Order History: {{{orderHistory}}}
  
  Response:`, // No function calls, NO Asynchronous Operations
});

const customerSupportWizardFlow = ai.defineFlow(
  {
    name: 'customerSupportWizardFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
