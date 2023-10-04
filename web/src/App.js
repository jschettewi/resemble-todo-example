import "./App.css";
import Todos from "./Todos";

// const sighInWithGoogle = () =>
//   auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

// const SignIn = () => (
//   <main>
//     <button onClick={sighInWithGoogle}>Sign In With Google</button>
//   </main>
// );

const App = () => {
  // const [user] = useAuthState(auth);

  // return user ? <Todos /> : <SignIn />;
  return <Todos />;
};

export default App;
