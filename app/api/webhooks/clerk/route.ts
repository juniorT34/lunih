import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { Role, User } from "@prisma/client";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  //  doing stuff
  const eventType = evt.type

  if (eventType === "user.created"){
    const {id,email_addresses, first_name,last_name,image_url,unsafe_metadata} = evt.data
    console.log("Received webhook data : ", evt.data)

    if (!id || !email_addresses || !unsafe_metadata?.role){
      console.error("Missing required data : ", {id,email_addresses, role:unsafe_metadata?.role})
      return new Response("Error occured -- missing required data", {status:400})
    }

    try {
      const userData = {
        clerkUserId: id,
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        imageUrl: image_url || "",
        role: unsafe_metadata.role as Role,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // console.log("Creating user with data : ", userData)
      const result = await createUser(userData as User)
      // console.log("User creation result : ", result)
      return new Response(JSON.stringify(result), {
        status: 200
      })
      // return result
    } catch (error) {
      console.error("Error in webhook handler : ", error)
      return new Response("Error processing webhook",{status:500})
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;
    
    if (!id) {
      console.error("Missing required data:", { id });
      return new Response("Error occurred -- missing required data", { status: 400 });
    }

    try {
      // Create update data with proper type handling
      const updateData: Partial<User> = {};

      // Only add fields that are present and not null
      if (email_addresses?.[0]?.email_address) {
        updateData.email = email_addresses[0].email_address;
      }
      if (first_name !== null && first_name !== undefined) {
        updateData.firstName = first_name || "";
      }
      if (last_name !== null && last_name !== undefined) {
        updateData.lastName = last_name || "";
      }
      if (image_url !== null && image_url !== undefined) {
        updateData.imageUrl = image_url || "";
      }
      if (unsafe_metadata?.role) {
        updateData.role = unsafe_metadata.role as Role;
      }

      updateData.updatedAt = new Date();

      console.log("Updating user with data:", updateData);
      return await updateUser(id, updateData);
    } catch (error) {
      console.error("Error in webhook handler:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    
    if (!id) {
      console.error("Missing required data:", { id });
      return new Response("Error occurred -- missing required data", { status: 400 });
    }

    try {
      return await deleteUser(id);
    } catch (error) {
      console.error("Error in webhook handler:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }


  return new Response("Webhook received", {status:200})
}
