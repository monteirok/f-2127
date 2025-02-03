import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

interface InquiryResponse {
  inquiryId: string;
  recipientEmail: string;
  recipientName: string;
  responseMessage: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (req.method !== 'POST') {
    console.log("Invalid method:", req.method);
    return new Response(
      JSON.stringify({ error: `Method ${req.method} not allowed` }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { recipientEmail, recipientName, responseMessage } = body as InquiryResponse;

    if (!recipientEmail || !recipientName || !responseMessage) {
      throw new Error("Missing required fields");
    }

    console.log("Sending email to:", recipientEmail);

    // For testing, send to the developer's email
    const testEmail = "karstenmonteirodev@gmail.com";
    
    const emailResponse = await resend.emails.send({
      from: "Mountain Mixology <reservations@mountainmixology.ca>",
      to: [testEmail], // Use testEmail for now until domain is verified
      subject: "Response to Your Inquiry - Mountain Mixology",
      html: `
        <h1>Hello ${recipientName},</h1>
        <p>Thank you for your inquiry with Mountain Mixology. Here's our response:</p>
        <div style="padding: 20px; background-color: #f5f5f5; border-radius: 5px; margin: 20px 0;">
          ${responseMessage}
        </div>
        <p>If you have any more questions, please don't hesitate to reach out.</p>
        <p>Best regards,<br>Mountain Mixology Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify(emailResponse),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-response function:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
};

serve(handler);