import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoDBurl: string | undefined = process.env.BETTER_AUTH_MONGODB_URL;

if (!mongoDBurl) {
  throw new Error("MongoDB URL is missing");
}

const client = new MongoClient(mongoDBurl);
const db = client.db("bazar-dor");
console.log();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
//   socialProviders: {
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//   },
});
