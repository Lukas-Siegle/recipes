import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const formSchema = z.object({
    name: z.string()
        .min(2, "Please enter a name with at least 2 characters.")
        .max(50, "The name cannot exceed 50 characters."),
    tags: z.array(z.string()).min(1).max(15),
    ingredients: z.array(z.string()).min(1).max(50),
    instructions: z.array(z.string()).min(1).max(20),
    description: z.string().min(0).max(255),
    carbohydrates: z.number().min(0).max(1028),
    calories: z.number().min(0).max(1028),
    estimate: z.number().min(0).max(1028),
    portions: z.number().min(0).max(1028),
    proteins: z.number().min(0).max(1028),
    fats: z.number().min(0).max(1028),
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
});

function checkFileType(file: File) {
  const fileType = file.name.split(".").pop()?.toLowerCase();
  return fileType === "png" || fileType === "jpg" || fileType === "jpeg";
}

export type FormSchema = typeof formSchema;