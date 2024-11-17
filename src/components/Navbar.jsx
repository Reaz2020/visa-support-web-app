import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/Network";
import { Navigate, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user ,  signOutUser,handleGoogleSignIn} = useContext(AuthContext);


function handleSignOut(){
  signOutUser().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}



    return ( <div>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li>
          <a>About us</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Logo</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li>   <NavLink to='/'> Home</NavLink> </li>
    <li>   <NavLink to='/start-learning'> Start-Learning</NavLink> </li>
    <li>   <NavLink to='/tutorial'> Tutorial</NavLink> </li>

     
    
      <li>   <NavLink to='/register'> Register</NavLink> </li>
      {user && (
                    <>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/history">History</NavLink>
                        </li>
                    </>
                )}
   



   
      {/* <NavLink to={'/login'}> Login or Sign Up</NavLink> */}
    </ul>
  </div>
  <div className="navbar-end">
  { 
  
     user? <li className="list-none"> <div className="flex gap-2 items-center justify-center">
    <img className="h-10 w-10 border-2 rounded-full bg-slate-400" src={user.photoURL}  alt="" /> 
    <button onClick={ handleSignOut}>log out</button></div></li> : 

  <li>   <NavLink to='/login'> Login</NavLink> </li>
      
    }
  </div>
</div>
    </div> );
}
 
export default Navbar;