import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  
  const [length,setLength] = useState(8);
  // this react hook initializes a state variable name 'length' with an initial value of '8' and a function 'setLength' to update its value in the UI
  const [numAllowed,setNumAllowed] = useState(false);
  // this react hook initializes a state variable named 'numAllowed' with an initial boolean value 'false' and a function 'setNumAllowed' to update its value in the UI
  const [charAllowed,setCharAllowed] = useState(false);
  // this react hook initializes a state variable named 'charAllowed' with an initial boolean value 'false' and a function 'setCharAllowed' to upadate its value in the UI
  const [password,setPassword] = useState("");
  // this react hook initializes a state variable named 'password' with an initial value of an empty string "" and a function 'setPassword' to update its value in the UI
   


  //useRef hook-it is used to reference a value that is not needed for Rendering
  const passwordRef = useRef(null);

  // useCallback is used for optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+= "0123456789";
    if(charAllowed) str+= "!@#%^&*(){}[]~`-_+=";

    for (let i = 1; i < length; i++){
       let char = Math.floor(Math.random()*str.length+1);
       pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numAllowed,charAllowed,setPassword]) // useCallBack is used in the to generate a random password with some dependecies
  // such as length of the password,numAllowed-that is if number is allowed in the password which has to be generated,charAllowed-that
  // is if special characters are allowed in the password which has to be generated and lastly setPassword-for optimizing the callBack hook
  // everytime a new password is updated/generated in the function setPassword

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() // this line of code is written to select the current value of the ref object - here 'passwordRef'
    passwordRef.current?.setSelectionRange(0,101) // this line of code is written to select the current value of the ref object within the selected range here - "0,101"
    window.navigator.clipboard.writeText(password) // this code is used to write text to the system clipboard using the Clipboard API.
  },[password])


  //useEffect(setup,dependencies?)
  //useEffect hook is used for re-rendering the UI again and again  
  useEffect(()=> {
    passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator] )

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gradient-to-r from-slate-300 to-indigo-600'>
        <h1 className='text-white text-center my-3'> Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef} // here passwordRef is stored in variable ref to manipulate with the password in the input field 
          />
          <button 
          onClick={copyPasswordToClipboard} // added an onclick event listener to copy the generated password from the input field into the browser clipboard
          className='outline-none bg-gradient-to-r from-emerald-800 to-neutral-400 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-6'>
           <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              // this value indicates the value which will be displayed in the input field. here {length} comes from the useState hook of const [length,setLength] = useState(8)
              value = {length}
                className='cursor-pointer' 
                onChange={(e) => {setLength(e.target.value)} } 
                //onChange is an event handler attribute in JSX.It specifies the function to run when the <input> element's value changes.
                //{(e)=>....} is an arrow function expression used as the event handler. When the onChange event is triggered, this arrow function will be executed.
              />
              <label> Length :   {length}</label>
           </div>
           <div className='flex items-center gap-x-1'>
                <input 
                 type="checkbox"
                 defaultChecked={numAllowed}
                 id="numberInput"
                 onChange={()=>{
                    setNumAllowed((prev)=> !prev);
                 }}
                
                />
                <label htmlFor='numberInput'> Numbers</label>
           </div>
           <div className='flex items-center gap-x-1'>
           <input 
                 type="checkbox"
                 defaultChecked={charAllowed}
                 id="characterInput"
                 onChange={()=>{
                    setCharAllowed((prev)=> !prev);
                 }}
                
                />
                <label htmlFor='characterInput'> Character</label>
           </div>
        </div>
      </div>
    </>
  )
}

export default App
