import * as crypto from "crypto";

export function generateRandomAddress( ): string {
    return crypto.randomBytes(32).toString("hex");
}