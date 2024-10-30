import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const formSchemaRecipe = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(255),
  image: z
    .any()
    .optional()
    .superRefine((file, ctx) => {
      if (file instanceof File) {
        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File size should be less than 5MB",
          });
        }
        if (!checkFileType(file)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File type should be PNG, JPG, or JPEG",
          });
        }
      }
    }),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  instructions: z.array(z.string()).min(1, "At least one instruction is required"),
  tags: z.array(z.string()),
  proteins: z.number().min(0).max(1028),
  fats: z.number().min(0).max(1028),
  carbohydrates: z.number().min(0).max(1028),
  calories: z.number().min(0).max(1028),
  estimate: z.number().min(0).max(1028),
  portions: z.number().min(0).max(1028)
});

export type FormSchema = typeof formSchemaRecipe;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
function checkFileType(file: File) {
  const fileType = file.name.split(".").pop()?.toLowerCase();
  return fileType === "png" || fileType === "jpg" || fileType === "jpeg";
}