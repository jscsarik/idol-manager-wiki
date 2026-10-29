import { redirect } from "next/navigation";
import { getRandomDocSlug } from "@/lib/wiki";

export const dynamic = "force-dynamic";

export default function RandomPage() {
  const randomSlug = getRandomDocSlug();
  redirect(`/wiki/${randomSlug}`);
}
