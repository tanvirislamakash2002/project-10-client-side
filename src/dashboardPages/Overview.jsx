import React from 'react';

const Overview = () => {
    return (
        <div>

           <section className="">
			<h2 className="text-center font-bold text-4xl my-4">Overview Of The Website</h2>
	<div className="container mx-auto grid justify-center grid-cols-1 text-center md:grid-cols-2 gap-4 p-4">
		<div className="flex flex-col bg-green-100 p-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">50+</p>
			<p className="text-sm sm:text-base">Total user</p>
		</div>

		<div className="flex flex-col bg-green-100 p-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">3</p>
			<p className="text-sm sm:text-base">Total post</p>
		</div>
		<div className="flex flex-col bg-green-100 p-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">8</p>
			<p className="text-sm sm:text-base">My post</p>
		</div>

		<div className="flex flex-col bg-green-100 p-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">10+</p>
			<p className="text-sm sm:text-base">daily active user</p>
		</div>
	</div>
</section>
        </div>
    );
};

export default Overview;