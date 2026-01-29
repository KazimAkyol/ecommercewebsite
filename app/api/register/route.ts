// app/api/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        console.log("=== REGISTER API CALLED ===");

        const body = await request.json();
        console.log("Request body:", body);

        const { email, name, password } = body;
        console.log("Extracted data:", { email, name, password });

        // 1. Validation
        if (!email || !name || !password) {
            console.log("Validation failed: Missing fields");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        console.log("Validation passed");

        // 2. Import'ları burada yap (hata ayıklama için)
        const bcrypt = await import("bcryptjs");
        const prisma = await import("@/libs/prismadb").then(m => m.default);

        console.log("Imports successful");

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        // 4. Create user
        console.log("Creating user with data:", { email, name });
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        console.log("User created successfully:", user.id);

        // 5. Remove password from response
        const { hashedPassword: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully",
                user: userWithoutPassword,
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("=== API ERROR DETAILS ===");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Full error:", JSON.stringify(error, null, 2));

        // Prisma specific errors
        if (error.code) {
            console.error("Prisma error code:", error.code);
        }

        return NextResponse.json(
            {
                error: "Registration failed",
                details: process.env.NODE_ENV === "development" ? error.message : undefined,
                code: error.code || "UNKNOWN_ERROR",
            },
            { status: 500 }
        );
    }
}