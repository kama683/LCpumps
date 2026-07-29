"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/dal";
import * as submissionsRepo from "@/lib/repositories/submissions";
import { privateStorage } from "@/lib/storage";

export async function deleteSubmissionAction(id: string): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) return { error: "Не авторизовано." };

  const attachmentPaths = await submissionsRepo.deleteSubmission(id);
  for (const path of attachmentPaths) {
    await privateStorage.delete(path);
  }

  revalidatePath("/admin/requests");
  return {};
}
