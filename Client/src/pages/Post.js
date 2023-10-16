import React, { useEffect, useState, useContext } from 'react'
import { useParams }  from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'


const Post = () => {
    let {id} = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
          setPostObject(res.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
          setComments(res.data)
        })
    }, [id])

    const addComment = () => {
      axios
        .post('http://localhost:3001/comments', {
          commentBody: newComment, 
          PostId: id
        }, 
        {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        }
        )
        .then((res) => {
            if(res.data.error){
              alert(res.data.error)
            }
            else{
              const commentToAdd = {commentBody: newComment, username: res.data.username}
              setComments([...comments, commentToAdd])
              setNewComment("")
            }
        })
    }

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/${id}`,{
        headers: { accessToken: localStorage.getItem('accessToken') },
      }).then(() => {
        setComments(comments.filter((val) => {
            return val.id !== id 
        }))
      })
    }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
        <div className='title'>{postObject.title}</div>
        <div className='body'>{postObject.postText}</div>
        <div className='footer'>{postObject.username}</div>
        </div>
      </div>
      <div className='rightSide'>
          <div className='addCommentContainer'>
            <input type='text' value={newComment}  placeholder='Comment...' autoComplete='off' onChange={(event) => {setNewComment(event.target.value)}}/>
            <button onClick={addComment}>Add Comment</button>
            </div>
          <div className='listOfComments'>
            {comments.map((comments, key) =>{
              return(
                <div key={key} className='comment'>
                    
                    <label>{comments.username}</label><br></br><br></br>

                    {comments.commentBody}
                    {authState.username === comments.username && <button onClick={() => {
                      deleteComment(comments.id)
                    }}>X</button>}
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

export default Post