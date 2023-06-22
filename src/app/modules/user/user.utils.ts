import { IAcademicSemester } from '../academic-semester/academic-semester.interface';
import { User } from './user.model';

const getLastStudentId = async (): Promise<string | undefined> => {
  const lastStudentId = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudentId?.id ? lastStudentId.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const id = (await getLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(id) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return incrementedId;
};

const getLastFacultyId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id ? lastId.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const id = (await getLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(id) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
const getLastAdminId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id ? lastId.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const id = (await getLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(id) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};
