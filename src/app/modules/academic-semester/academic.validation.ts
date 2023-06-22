import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year must be needed',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Semester must be needed',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year must be needed',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: 'Semester must be needed',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
