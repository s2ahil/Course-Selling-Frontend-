
import { useState } from "react";
import Message from "../../public/svg/message.svg";
import confused from "../Images/confused.png"
import { BASE_URL } from "../baseUrl";
function App() {
    const [showArray, setShowArray] = useState(false);
    const answers = [{
        error: 'There\'s a dead link. ',
    },
    {
        error: 'A typo in a URL or that it’s broken. ',
    },
    {
        error: 'Server is down. ',
    },
    {
        error: 'you are offline. ',
    }
    ]

    const handleRedirect = () => {

        window.location.href = `/`;
    };

    return (
        <>
            <div className='flex flex-col h-full justify-center items-center m-4'>


                <div className="grid  

          p-4 gap-5">
                    <div className="flex gap-8 flex-col items-center justify-center">
                        <div className='text-5xl ' >
                            <span className="flex gap-1 justify-center items-center text-5xl">4 <img className="" src={Message}></img>4</span>
                        </div>

                        <img src={confused} className="h-[10rem] "></img>
                        <div className='text-5xl underline_higlight' >Page not found</div>


                        <button className="bg-[#FFC900] p-4  border-[1px] border-black  rounded-xl font-bold" id="GoBackButton" onClick={handleRedirect}>Return Back  :)</button>
                    </div>


                </div>




                {/* little desc of error */}
                <div className="flex flex-col  items-center  w-full p-4 h-[12rem] ">
                    <div className="cursor-pointer hover:text-blue-700 font-semibold underline_highlight text-xl italic highlight " onClick={() => setShowArray(!showArray)}>Why this page ?</div>

                    {showArray && (

                        <div className="mt-4  ">
                            <ul className="list-disc font-semibold italic"  >
                                {answers.map((answer, index) => (
                                    <li className="m-2" key={index}>{answer.error}</li>
                                ))}
                            </ul>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}

export default App