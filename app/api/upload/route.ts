// app/api/upload/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Upload to Pinata
    const uploadData = await pinata.upload.file(file);

    if (!uploadData?.cid) {
      throw new Error('Failed to get CID from Pinata');
    }

    // Create signed URL
    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600, // 1 hour expiration
    });

    return NextResponse.json({ 
      success: true, 
      url,
      cid: uploadData.cid 
    }, { 
      status: 200 
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to upload image" 
      },
      { 
        status: 500 
      }
    );
  }
}

// Optional: Add configuration for the maximum file size
export const config = {
  api: {
    bodyParser: false, // Disable body parser for file uploads
    maxDuration: 30, // 30 seconds timeout
  },
};