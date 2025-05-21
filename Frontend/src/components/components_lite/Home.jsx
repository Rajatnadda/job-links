import React, {  useEffect } from 'react'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Navbar from './Navbar'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [loading, error] = useGetAllJobs();
  const jobs  = useSelector((state) => state.jobs.alljobs);

  console.log("jobs in component: ", {loading, error, jobs});
  const {user} = useSelector((store) => store.auth)
const navigate = useNavigate();
useEffect(() => {
if(user?. role === "Recruiter"){
  navigate("/admin/companies")
}

},[])


  return (
    <div>
      <Navbar />
      <Header />
       <Categories />
       {loading && <p>loading jobs....</p>}
       {error && <p>{error}</p>}
       {!loading  && !error && <LatestJobs jobs={jobs} /> }
      <LatestJobs />
      <Footer />  
    </div>
  )
}

export default Home
