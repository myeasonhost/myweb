import java from 'utils/java'


export function getZbList(category,position, pageSize) {
  return java({
    url: "/index/{0}/getIndexList/{1}/{2}".format(category,position,pageSize),
    method: 'GET'
  });
}

export function enterRoom(roomId,token) {
    return java({
        url: "/room/{0}/enterRoom?token={1}".format(roomId,token),
        method: 'GET'
    });
}

