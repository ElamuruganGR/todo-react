export const ENDPOINTS = {
  GET: `${process.env.REACT_APP_END_POINT}/todos`,
  POST: `${process.env.REACT_APP_END_POINT}/todos/add`,
  UPDATE: (id: string) =>
    `${process.env.REACT_APP_END_POINT}/todos/update/${id}`,
  COMPLETE: (id: string) =>
    `${process.env.REACT_APP_END_POINT}/todos/complete/${id}`,
  DELETE: (id: string) =>
    `${process.env.REACT_APP_END_POINT}/todos/delete/${id}`,
};
export enum HTTPReqMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
