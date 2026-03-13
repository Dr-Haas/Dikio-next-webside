import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProjectNotificationRequest {
  projectName: string;
  fullName: string;
  email: string;
  phone?: string;
  objective?: string;
  budget?: string;
  siteUrl?: string;
}

// Logo URL - update this with your production domain
const LOGO_URL = "https://dikio.fr/lovable-uploads/771a8b36-282b-42f2-8437-f98e84fc4d05.png";

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    const data: ProjectNotificationRequest = await req.json();
    const { projectName, fullName, email, phone, objective, budget } = data;

    // Send notification email to admin
    const adminEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Dikio Studio",
          email: "gary.h@dikio.fr",
        },
        to: [
          {
            email: "gary.h@dikio.fr",
            name: "Gary - Dikio Studio",
          },
        ],
        subject: `🚀 Nouveau projet soumis: ${projectName}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header with Logo -->
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
              <img src="${LOGO_URL}" alt="Dikio Studio" style="height: 60px; width: auto;" />
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <h1 style="color: #1a1a2e; margin: 0 0 10px;">🚀 Nouveau projet soumis!</h1>
              <h2 style="color: #4361ee; margin: 0 0 25px;">${projectName}</h2>
              
              <table style="border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; background: #f8f9fa; width: 35%;"><strong>Nom complet</strong></td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; background: #f8f9fa;"><strong>Email</strong></td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #4361ee;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; background: #f8f9fa;"><strong>Téléphone</strong></td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0;">${phone || "Non fourni"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; background: #f8f9fa;"><strong>Objectif</strong></td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0;">${objective || "Non spécifié"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; background: #f8f9fa;"><strong>Budget</strong></td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0;">${budget || "Non spécifié"}</td>
                </tr>
              </table>
              
              <p style="margin-top: 25px; color: #666; font-size: 14px;">
                📋 Connectez-vous à Supabase pour voir tous les détails du projet.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 12px;">© 2024 Dikio Studio - Tous droits réservés</p>
            </div>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.json();
      console.error("Brevo API error:", errorData);
      throw new Error(`Failed to send admin notification: ${JSON.stringify(errorData)}`);
    }

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Dikio Studio",
          email: "gary.h@dikio.fr",
        },
        to: [
          {
            email: email,
            name: fullName,
          },
        ],
        subject: "✨ Confirmation de votre demande - Dikio Studio",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header with Logo -->
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
              <img src="${LOGO_URL}" alt="Dikio Studio" style="height: 60px; width: auto;" />
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <h2 style="color: #1a1a2e; margin: 0 0 20px;">Bonjour ${fullName} 👋</h2>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 15px;">
                Nous avons bien reçu votre demande concernant le projet <strong style="color: #4361ee;">${projectName}</strong>.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 20px;">
                Notre équipe analyse actuellement vos besoins et <strong>reviendra vers vous très rapidement</strong> pour discuter des prochaines étapes et vous proposer la solution la plus adaptée.
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #4361ee; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #555; font-size: 15px;">
                  💡 <strong>Astuce :</strong> En attendant, n'hésitez pas à préparer vos questions ou à rassembler des exemples de projets qui vous inspirent !
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
                À très bientôt !
              </p>
            </div>
            
            <!-- Signature -->
            <div style="padding: 0 30px 30px;">
              <div style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
                <p style="margin: 0; color: #1a1a2e; font-weight: bold;">L'équipe Dikio Studio</p>
                <p style="margin: 5px 0 0; color: #666; font-size: 14px;">Créateurs d'expériences digitales</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1a1a2e; padding: 25px; text-align: center;">
              <p style="margin: 0 0 10px; color: #ffffff; font-size: 14px;">
                <a href="https://dikio.fr" style="color: #4361ee; text-decoration: none;">dikio.fr</a>
              </p>
              <p style="margin: 0; color: #888; font-size: 12px;">© 2024 Dikio Studio - Tous droits réservés</p>
            </div>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorData = await userEmailResponse.json();
      console.error("Brevo API error for user email:", errorData);
      // Don't throw here, admin email was sent successfully
    }

    console.log("Emails sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
