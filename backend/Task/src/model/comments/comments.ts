//model/comments/comments.ts
export interface IComments {
    id:number,
    author: string,
    comment: string,
    taskId?: number
}