import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, eventTitle, ticketId, eventDate, eventTime, eventLocation } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Initialize SMTP client
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOSTNAME") ?? "",
      port: parseInt(Deno.env.get("SMTP_PORT") ?? "587"),
      username: Deno.env.get("SMTP_USERNAME") ?? "",
      password: Deno.env.get("SMTP_PASSWORD") ?? "",
    });

    // Create email content
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #0A1128; margin-bottom: 20px;">Your Ticket Confirmation</h1>
            
            <p>Thank you for requesting a ticket for <strong>${eventTitle}</strong>!</p>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #0A1128; margin-bottom: 15px;">Event Details</h2>
              <p><strong>Event:</strong> ${eventTitle}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Time:</strong> ${eventTime}</p>
              <p><strong>Location:</strong> ${eventLocation}</p>
              <p><strong>Ticket ID:</strong> ${ticketId}</p>
            </div>
            
            <p>You can access your ticket at any time by logging into your account and visiting the "My Tickets" section.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                If you have any questions, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM_EMAIL") ?? "",
      to: email,
      subject: `Your Ticket for ${eventTitle}`,
      content: "This email requires HTML support",
      html: emailContent,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
}); 