import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, IRefreshTokenResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelpes';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  //check login user Exist or Not
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // );
  // const user = new User();
  const isUserExist = await User.isUserExist(id);
  const needsPasswordChange = isUserExist?.needsPasswordChange;
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  //checking password matching
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
  }
  //create access token and refresh token
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.secret_key as Secret,
  //   { expiresIn: config.jwt.expires_in_secret_key }
  // );
  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.refresh_secret_key as Secret,
  //   { expiresIn: config.jwt.expires_in_refresh_key }
  // );

  //create access token and refresh token using helpers function
  const jwtPayload = { id: isUserExist?.id, role: isUserExist?.role };
  const accessToken = JwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret_key as Secret,
    config.jwt.expires_in_secret_key as string
  );
  const refreshToken = JwtHelpers.createToken(
    jwtPayload,
    config.jwt.refresh_secret_key as Secret,
    config.jwt.expires_in_refresh_key as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (
  token: string
): Promise<IRefreshTokenResponse | null> => {
  let verifyToken = null;
  try {
    verifyToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret_key as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your token is not valid');
  }
  const { id } = verifyToken;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  //create newAccessToken
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret_key as Secret,
    '2d'
  );
  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
};
