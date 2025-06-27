import React from 'react';
import { FaGithub, FaLinkedin, FaSquareFacebook } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="custom-bg-400 text-white">
      <div className="footer sm:footer-horizontal p-10 max-w-7xl mx-auto">
        <aside>
        <a className={` text-3xl font-bold text-white`}>Room<span className='text-green-500'>Ease</span></a>
          <p>
            Providing reliable Roommate since 2022
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Explore</h6>
          <Link to='/' className="link link-hover">Home</Link>
          <Link to='/all-items' className="link link-hover">All Items</Link>
          <Link to='/about-us' className="link link-hover">About us</Link>
          <Link to='/contact-us' className="link link-hover">Contact us</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social links</h6>
          <div className="flex gap-2">
            <a href='https://github.com/tanvirislamakash2002' target='_blank' className="link link-hover"><FaGithub size={19} /></a>
            <a href='https://www.linkedin.com/' target='_blank' className="link link-hover"><FaLinkedin size={19} /></a>
            <a href='https://www.facebook.com/' target='_blank' className="link link-hover"><FaSquareFacebook size={19} /></a>
          </div>
        </nav>
      </div>
      <div className='text-center bg-black/50 py-2'> &copy; All right reserved by RoomEase</div>
    </footer>
  );
};

export default Footer;