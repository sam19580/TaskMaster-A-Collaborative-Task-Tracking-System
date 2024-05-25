const userData=require('../data/registeredUsers.json');
const eventData=require('../data/registeredEvents.json');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const fs=require('fs');
class Validation{
   
   static checkUser(username){
      
      const users=userData["users"];
      
      
      const value=users.find((element)=>{
         return element.username===username;
        
      });
      
      if(value){
         return true;
      }
    return false;
   
   }
   static findUser(username){
      

   }
   static lastId(data){
      len=data.length;
      if(len===0){
         return -1;
      }else{
         len=data[len-1].id;
      }
      return ans;
   }
   static checkPassword(password){
      const hashedPass=0;
      return hashedPass
   }
   static hashPassword(password){
      console.log(password);
      const rounds=10;
      const hash= bcrypt.hashSync(password,rounds,(err,hash)=>{
         if(err){
            console.log(err);
         }else{
            console.log(hash);
            return hash;
         }
      })
      return hash;
   }
   static issueToken(object){
      const token=jwt.sign(object,'secret');
      return token;
   }
   static verifyToken(token){
      const result =jwt.verify(token,'secret');
      return result;
   }
   static setOptionalProperties(obj){
      if(obj.hasOwnProperty("limited capacity")){
         obj["limited capacity"]=false;
         obj["booked"]=0;
         obj["capacity"]=-1;
      }
   }
   static pushUsers(user){
      const id=getNewIdForUser(userData);
      user["id"]=id;
      userData.users.push(user);
    return true;
   }
   static getNewIdForUser(data){
     const len= data.users.length;
      const id=parseInt(data.users[len].id)+1;
      return id;
   }
   static getNewIdForEvent(data){
      const len= data.events.length;
       const id=parseInt(data.users[len].id)+1;
       
       return id;
    }
   static pushEvents(events){
      const id=getNewIdForEvent(eventData);
      eventData.events.push(data);
     return true;
   }
   static pushParticipant(eventId){
      return true;
   }
}
module.exports=Validation;