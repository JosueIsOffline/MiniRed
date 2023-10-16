import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    let history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:3001/posts').then((res) => {
         setListOfPosts(res.data)
        })
    }, [])


    const likePost = (postId) => {
      axios.post('http://localhost:3001/like', 
      { PostId: postId }, 
      { headers: { accessToken: localStorage.getItem('accessToken') } }
        ).then((res) => {
          setListOfPosts(listOfPosts.map((post) => {
            if(post.id === postId){
              if(res.data.liked){
                return { ...post, Likes: [...post.Likes, 0] }
              }
              else{
                const likesArray = post.Likes
                likesArray.pop()
                return { ...post, Likes: likesArray}
              }
            }
            else{
              return post;  
            }
          }))
        })
    }



  return (
    <div>
         {listOfPosts.map((value, key) => {
          return (
            <div key={key} className='post'>
                <div className='title'>{value.title}</div>
                  <div 
                    className='body'
                    onClick={()=> {
                      history.push(`/post/${value.id}`)
                    }}
                  >
                      {value.postText}
                  </div>
                <div className='footer'>
                  {value.username}
                  <button onClick={() => likePost(value.id)}>Like</button>
                  <label>{value.Likes.length}</label>
                </div>
            </div>
          )
      })}
    </div>
  )
}

export default Home