import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string(),
  sku: z.string(),
  quantity: z.number().int().min(1),
  reagentKit: z.string().optional(),
});

const leadSchema = z.object({
  type: z.enum(["contact", "quote"]),
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional(),
  institution: z.string().max(160).optional(),
  location: z.string().max(160).optional(),
  message: z.string().max(4000).optional(),
  items: z.array(itemSchema).default([]),
  annualVolume: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
  budgetRange: z.string().max(80).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        type: data.type,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        institution: data.institution ?? null,
        location: data.location ?? null,
        message: data.message ?? null,
        items: data.items,
        annual_volume: data.annualVolume ?? null,
        timeline: data.timeline ?? null,
        budget_range: data.budgetRange ?? null,
      })
      .select("id, reference, created_at")
      .single();

    if (error || !lead) {
      throw new Error(error?.message ?? "Could not save your request. Please try again.");
    }

    // Notify the internal team.
    const { data: team } = await supabaseAdmin
      .from("team_members")
      .select("name, email")
      .eq("notify", true);

    const recipients = (team ?? []).map((t) => t.email);
    const subject =
      data.type === "quote"
        ? `New quotation request ${lead.reference} - ${data.institution ?? data.fullName}`
        : `New enquiry ${lead.reference} - ${data.institution ?? data.fullName}`;
    const body = [
      `Reference: ${lead.reference}`,
      `Type: ${data.type}`,
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone ?? "-"}`,
      `Institution: ${data.institution ?? "-"}`,
      `Location: ${data.location ?? "-"}`,
      data.items.length
        ? `Items:\n${data.items
            .map(
              (i) =>
                ` - ${i.name} (${i.sku}) x${i.quantity}${i.reagentKit ? ` | reagent kit: ${i.reagentKit}` : ""}`,
            )
            .join("\n")}`
        : "Items: -",
      `Annual volume: ${data.annualVolume ?? "-"}`,
      `Timeline: ${data.timeline ?? "-"}`,
      `Message: ${data.message ?? "-"}`,
    ].join("\n");

    const resendKey = process.env["RESEND_API_KEY"];
    let notified = false;

    if (resendKey && recipients.length) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Livan Website <onboarding@resend.dev>",
            to: recipients,
            reply_to: data.email,
            subject,
            text: body,
          }),
        });
        notified = res.ok;
      } catch {
        notified = false;
      }
    }

    if (!notified) {
      // Fallback: the lead is still queued in the dashboard for the team.
      console.info(`[lead] ${subject}\n${body}\nrecipients: ${recipients.join(", ")}`);
    }

    return { reference: lead.reference as string, notified };
  });
