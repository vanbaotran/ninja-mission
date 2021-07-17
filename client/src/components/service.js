import axios from 'axios';
 
const service = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});
export default service;

function login(email, password) {
  return service.post('/users/login', {email, password}).then(response => response.data)
}
export {login}
 

function signup(name, email, password, profileType) {
  return service.post('/users/signup', {name, email, password, profileType}).then(response => response.data)
}
export {signup}
 