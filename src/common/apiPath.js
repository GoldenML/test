let getApi = function (path) {
  return path
}
export default {
  GET_USER_LOGIN: getApi('/user/login'),
  GET_USER_EXIT: getApi('/user/exit'),
  GET_USER_JBXX: getApi('/user/jbxx'),
  GET_USER_XGMM: getApi('/user/xgmm'),
  GET_FILE_UPLOAD: getApi('/file/upload'),
  GET_FILE_UPLOAD_ZC: getApi('/file/uploadzc'),
  GET_FILE_CX: getApi('/file/filecx'),
  GET_All_FILE_CX: getApi('/file/allfilecx'),
  GET_FILE_DEL: getApi('/file/filedel'),
  GET_FILE_CZ: getApi('/file/cz')
}
