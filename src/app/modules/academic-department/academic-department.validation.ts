import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title must be provided',
    }),
    academicFaculty: z.string({
      required_error: 'academicDepartment must be needed',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});
export const AcademicDepartmentZodValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
