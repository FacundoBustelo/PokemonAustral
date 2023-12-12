import instance from "../Config/axios";
export function getAllCharacters(offset) {

  return instance.get("/pokemon/?limit=20&offset="+offset);
}
export function getCharacterInfo(id) {

  return instance.get(`/pokemon/${id}`);
}

