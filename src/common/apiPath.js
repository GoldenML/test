import { get } from 'mobx'

let getApi = function (path) {
  return path
}
export default {
  GET_USER_LOGIN: getApi('/user/login'),
  GET_USER_EXIT: getApi('/user/exit'),
  GET_USER_JBXX: getApi('/user/jbxx'),
  GET_USER_XGMM: getApi('/user/chgPassword'),
  GET_FILE_UPLOAD: getApi('/file/upload'),
  GET_FILE_UPLOAD_ZC: getApi('/file/uploadzc'),
  GET_FILE_CX: getApi('/file/filecx'),
  GET_All_FILE_CX: getApi('/file/allfilecx'),
  GET_FILE_DEL: getApi('/file/filedel'),
  GET_FILE_CZ: getApi('/file/cz'),
  GET_GRHX_JBXX: getApi('/grhx/jbxx'),
  UPDATE_USER_JBXX: getApi('/user/jbxx/update'),

  POST_POST_PUBLISH: getApi('/post/post/publish'),
  POST_POST_FIND: getApi('/post/post/find'),
  POST_POST_FIND_KEYWORDS: getApi('/post/post/find/keywords'),
}
