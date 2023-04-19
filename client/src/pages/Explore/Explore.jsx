import React from 'react'
import LeftBar from '../../components/LeftBar/LeftBar'
import RightBar from '../../components/RightBar/RightBar'

const Explore = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-4'>
			<div className='px-4'>
				<LeftBar/>
			</div>

			<div className="col-span-2 border-x-2 border-t-slate-800 px-6"></div>

			<div className='px-4'>
				<RightBar/>
			</div>
		</div>
	)
}

export default Explore