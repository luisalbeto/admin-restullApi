import { Comment } from "@prisma/client";


const sleep = (seconds: number = 0):Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })

}



export const createComment = async(content: string, userId: string, todoId: string):Promise<Comment> => {

  const body = { content , userId, todoId  }

  const comment = await fetch(`/api/comments`,{
    method: 'POST',
    body: JSON.stringify( body ),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( res => res.json())

  console.log(comment)

  return comment
}

export const getCommentsByTodoId = async (todoId: string): Promise<Comment[]> => {
  const comments = await fetch(`/api/comments?todoId=${todoId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  //console.log(comments);

  return comments;
};


export const getUserById = async (userId: string) => {
  const user = await fetch(`/api/users/${userId}`).then((res) => res.json());
  return user;
};
