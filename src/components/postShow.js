import React from 'react' 
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { startGetUsers } from '../actions/usersAction'
import {startGetPosts} from  '../actions/postsAction'
import {startGetComments} from '../actions/commentAction'

class PostShow extends React.Component{
    constructor(){
        super()
        this.state ={
            post : {},
            user : {},
            comments : []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log(id)
         
        if (this.props.users.length === 0 || this.props.posts.length === 0 ) {
            console.log('before load')
            this.props.dispatch(startGetUsers())
            this.props.dispatch(startGetPosts())
            this.props.dispatch(resetComments())
           
        } 
        
       const refersh = setInterval(
            () => {
               
              if (this.props.users.length > 0 && this.props.posts.length > 0) {                    
                    const users = this.props.users.filter(user => {                                        
                      return user.id === parseInt(id)
                })

                const post = this.props.posts.filter(post =>{
                    return post.userId === parseInt(id)
                })
 
                this.setState({user:users[0] , post})
                clearInterval(refersh)
              }
            },
            1000
          )
 

        
    }
    render(){
        return (
            <div style = {{backgroundColor:'aqua'}}>
                 <h1> UserName : {this.state.user.name}</h1>
                  <hr/>
                <h2> Title : {this.state.post.title}</h2>
                <h2> Body : {this.state.post.body}</h2>
                <hr/>
                <h2>Comments : </h2>
                <ul>
                    {
                        this.state.comments.map (function(ele,i){
                            return (
                                <li key ={i}> {ele.body} </li>
                            )   
                        })
                    }
                </ul>
                <hr/>
                <Link to = {`/users/${this.state.user.id}`}> More about Author -{this.state.user.name}</Link> &nbsp;
                <Link to ='/posts'><button> Goto Posts List</button></Link>
            </div>
        )
    }
}


export default PostShow





import React from 'react' 
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { startGetUsers } from '../actions/usersAction'
import {startGetPosts} from  '../actions/postsAction'

class UserShow extends React.Component{ 
    constructor(){
        super()
        this.state = {
            user : {},
            post: []
            
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        console.log(id)
         
        if (this.props.users.length === 0 || this.props.posts.length === 0) {
            console.log('before load')
            this.props.dispatch(startGetUsers())
            this.props.dispatch(startGetPosts())
           
        } 
        
       const refersh = setInterval(
            () => {
               
              if (this.props.users.length > 0 && this.props.posts.length > 0) {                    
                    const users = this.props.users.filter(user => {                                        
                      return user.id === parseInt(id)
                })

                const post = this.props.posts.filter(post =>{
                    return post.userId === parseInt(id)
                })
 
                this.setState({user:users[0] , post})
                clearInterval(refersh)
              }
            },
            1000
          )
 

        
    }
    render(){
        return (
            <div style = {{backgroundColor:'aqua'}}>
                 <h1>Username : {this.state.user.name}</h1>
                <h3>Posts written by user: </h3>
                <ul>
                    {
                        this.state.post.map(function(post) {
                            return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                        })
                    }
                </ul>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
        posts:state.posts
    }
}
export default connect(mapStateToProps)(UserShow)
 