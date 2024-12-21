
import MiddleSection from '../reusableComponents/middleSection'
import { Link } from 'react-router-dom'
import CourseImage from "../Images/courseSell.png"
const Front = () => {



  const MiddleSectionImage = [
    { image: "https://d2nir1j4sou8ez.cloudfront.net/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png", src: "course1" },
    { image: "https://repository-images.githubusercontent.com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124", src: "course2" },
    { image: "https://qualitapps.com/wp-content/uploads/2023/02/102.png", src: "course3" }

  ]
  return (
    <div className='bg-[#E5E7EB] min-h-screen flex flex-col justify-between'>

      <div className='flex flex-col gap-2 md:flex-row '>


        <div>
          <div className='md:ml-5 p-5 text-3xl  text-center sm:text-left  text-[#374151]'>Learn From Our Free Courses</div>


          <div className='md:ml-5 p-5 text-4xl  text-center sm:text-left font-medium'>Dont worry we have Both paid and free courses</div>

          <div className='md:ml-5 p-5 text-xl  text-center sm:text-left underline  decoration-sky-500 	'>Never stop Learning </div>

          <div className='text-center md:text-left md:ml-5 p-5 m-5'>
            <Link to="/login" className='bg-blue-400 p-3 rounded-xl text-[#ffff]  font-bold transition-transform transform hover:-translate-y-1 hover:shadow-2xl'>Get Started</Link>
          </div>
        </div>

        <div className='p-5'> <img
          className="h-80 w-auto"
          src={CourseImage}
          alt="SkillNest"
        /></div>




      </div>




      <div className="text-center p-2 bg-[#E5E7EB]">
        <div>© 2024 Copyright: Dev</div>
      </div>


    </div>
  )
}

export default Front
