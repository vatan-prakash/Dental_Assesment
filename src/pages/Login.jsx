
import '../App.css';

function Login() {
  return (
    <div className="App">
       <div className="login">
         <div>
           <input type="text" placeholder="Email"/>           
         </div>
         <div>
           <input type="text" placeholder="Password"/>           
         </div>
         <div className="dont">Don't have an account? Signup instead</div>
         <a href="/dashboard" className="btn">Submit</a>
         <div className='or'>OR</div>
         <div className="btn1"><img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" width="25"/> Login with Google</div>
       </div>
    </div>
  );
}

export default Login;
