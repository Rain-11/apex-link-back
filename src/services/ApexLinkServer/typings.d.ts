declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInteger = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseInterfaceInfoVo = {
    code?: number;
    data?: InterfaceInfoVo;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoVo = {
    code?: number;
    data?: PageInterfaceInfoVo;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseSignatureAuthenticationVo = {
    code?: number;
    data?: SignatureAuthenticationVo;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BaseResponseVoid = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type batchDeletionParams = {
    ids: number[];
  };

  type ChangePasswordDto = {
    userPassword?: string;
    verifyPassword?: string;
    verificationCode?: string;
  };

  type deleteInterfaceBasedOnIDParams = {
    deleteRequest: DeleteRequest;
  };

  type DeleteRequest = {
    id?: number;
  };

  type ForgotPasswordDto = {
    email?: string;
    userPassword?: string;
    verificationCode?: string;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type InterfaceAddDto = {
    name?: string;
    url?: string;
    detail?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
  };

  type InterfaceInfoVo = {
    id?: number;
    name?: string;
    url?: string;
    detail?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userName?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type InterfaceQueryDto = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    url?: string;
    detail?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
    status?: number;
  };

  type InterfaceStatusDto = {
    id?: number;
  };

  type InterfaceUpdateDto = {
    id?: number;
    name?: string;
    url?: string;
    detail?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
    status?: number;
  };

  type LoginUserVO = {
    id?: number;
    email?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageInterfaceInfoVo = {
    records?: InterfaceInfoVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type queryInterfaceBasedOnIDParams = {
    id: string;
  };

  type sendVerificationCodeParams = {
    email: string;
  };

  type SignatureAuthenticationVo = {
    secretKey?: string;
    secretId?: string;
  };

  type User = {
    id?: number;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    email?: string;
    userProfile?: string;
    secretKey?: string;
    secretId?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    email?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    email?: string;
    userPassword?: string;
    verificationCode?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    email?: string;
    userPassword?: string;
    verificationCode?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    email?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
}
