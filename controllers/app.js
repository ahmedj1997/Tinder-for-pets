const {uploadPost,uploadProfile} = require('./upload');
const {User} = require("../models/Users");
const {Post} = require("../models/Posts");
const bcrypt = require('bcrypt');
let ObjectId = require('mongodb').ObjectId;

exports.index_show_get = function(req,res){
    res.render('../views/index.ejs', {layout: '../views/layouts/layoutIndex.ejs'});
}

exports.home_show_get = async function(req,res){
    let posts =  await Post.find().sort({postDate: -1});
    let postsTotal = [];
    
    for(const post of posts){
        let userData = await User.find({posts: post._id})
        userData = userData[0]
        postsTotal.push({
            postUserId: userData.userName,
            postImage: post.postImage,
            userCity: userData.city,
            userCountry: userData.country,
            userProfileImage: userData.profileImage
        })
    }
    res.render('../views/home.ejs', {posts: postsTotal});
}

exports.friendsFeed_show_get = async function(req,res){
    let friends = res.locals.user.friends;
    let posts = [];
    for await(let friend of friends){
        let friendData = await User.find({
            userName: friend
        })
        friendData = friendData[0]
        if(friendData.posts.length > 0){
            let post = await Post.findById(friendData.posts);
            posts.push({
                    postUserId: post.postUserId,
                    postImage: post.postImage,
                    userCity: friendData.city,
                    userCountry: friendData.country,
                    userProfileImage: friendData.profileImage
            })
        }
    }
    res.render('../views/feedFriends.ejs', { posts: posts});
}

exports.profile_show_get = async function(req,res){
    let currentUser = ObjectId(res.locals.user._id).toString();
    let userData = await User.find({userName: req.params.id});
    let user = userData[0];
    user._id = ObjectId(user._id).toString();
    let posts = user.posts;
    let postsTotal = [];
    
    for await(let post of posts){
        let postData = await Post.findById(post);
        postsTotal.push({
            postId: postData._id,
            postUserId: user.userName,
            postImage: postData.postImage,
            userCity: user.city,
            userCountry: user.country,
            userProfileImage: user.profileImage
        })
    }

    res.render('../views/profile.ejs',{currentUser: currentUser,user: user, posts: postsTotal, friends: res.locals.user.friends});
}

exports.settings_show_get = function(req,res){
    res.render('../views/settings.ejs', {user: res.locals.user});
}
exports.friends_list_get = function(req,res){
    res.render('../views/friends.ejs', {friends: res.locals.user.friends});
}
exports.profile_picture_update = async function(req, res){
    uploadProfile(req,res, (err) =>{
        if(err){
            res.send("Something went wrong!")
        }
        User.findByIdAndUpdate(req.body.userId,{
            profileImage: req.file.filename
        }, function (err, docs){
            if(err){
                console.log(err);
            }else{
                console.log("updated user: ", docs)
            }
        })
        res.redirect('/settings')
    })
}
exports.add_friend_post = async function(req,res){
    let friendId = req.body.friendId;
    let currentUser = await User.findById(res.locals.user._id);
    currentUser.friends.push(friendId);
    currentUser.save()
    .then(() =>{
        res.redirect(`/profile/${friendId}`);
    })
}

exports.remove_friend_post = async function(req,res){
    let currentUser = await User.findById(res.locals.user._id);
    let friendId = req.body.friendId;
    currentUser.friends.splice(currentUser.friends.indexOf(friendId), 1);
    currentUser.save()
    .then(()=> {
        res.redirect(`/profile/${friendId}`);
    })
}
exports.password_change_post = async function(req,res){
    let password = bcrypt.hashSync(req.body.password, 10)
    req.body.password = password;
    let updateInfo = req.body;
    for(let field in updateInfo){
        if(updateInfo[field] == ""){
            updateInfo[field] = res.locals[field]
        }
    }
    console.log(updateInfo);
    User.findByIdAndUpdate(res.locals.user._id,updateInfo, (err) =>{
        if(err){
            console.log(err)
        }else{
            redirect('/settings')
        }
    })
}

exports.newPost_post = async function(req,res){
    let currentUser = await User.findById(res.locals.user._id);
    uploadPost(req, res, (err) => {
        if(err) {
            res.send("Something went wrong!");
        }
        let date = Date.now();
        let post = new Post();
        post.postDate =  date;
        post.amountLikes, post.amountDislikes = 0;
        post.postUserId = res.locals.user.userName;
        post.postImage = req.file.filename;
        //CHECK CODE LATER
        post.postLocation = `${res.locals.user.city}, ${res.locals.user.country}`;
        post.save()
        .then(() =>{
            res.redirect('/home')
        })
        .catch((error) => {
            console.log(error);
        })
        currentUser.posts.push(post._id);
        currentUser.save()
        .then()
        .catch((err) =>{
            console.log(err);
        })
    });
}

exports.deletePost_post = async function(req,res){
    let postId = new ObjectId(req.body.postId);
    let user = await User.find({posts: postId})
    user = user[0];
    let userData = new ObjectId(user._id).toString();
    let currentUser = new ObjectId(res.locals.user._id).toString();
    if(currentUser == userData){
        await Post.findByIdAndDelete(postId);
        user.posts.splice(user.posts.indexOf(postId), 1);
        user.save()
        .then(()=>{
            res.redirect(`/profile/${res.locals.user.userName}`);
        })
    }else{
        res.redirect(`/profile/${res.locals.user.userName}`);
    }
}
