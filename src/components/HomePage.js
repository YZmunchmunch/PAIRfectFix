import React from 'react'
import "./homepage.css"
import homeimage from "../images/HomePic.png"
import donatepic from "../images/donatepic.png"
import repairpic from "../images/repairpic.png"
import footerpic from "../images/footer.png"
import { Link } from 'react-router-dom';

export default function HomePage() {
    return(
        <>
					<div className="home-container">
						<div className='who-are-we'>
							<img className="home-image" src={homeimage} />
							<div className='who-are-we-text'>
								<h2>Who are We?</h2>
								<p>ReTechnimate is a transformative web application aimed at reshaping the consumerist mindset and promoting responsible electronics consumption. Our motto is to inspire change, empower sustainability, and give electronics a second life.</p>
								<br />
								<h2>Origins of our Name</h2>
								<p>"Re": This prefix suggests "again" or "renew," indicating a focus on giving something a second chance or a new beginning.</p>
								<p>"Technimate": A portmanteau of "tech" (short for technology) and "animate" (to give life or motion to). This combination implies the act of bringing technology back to life, reanimating it, and giving it a renewed purpose.</p>
							</div>
						</div>
						<div className='repair-stuff'>
							<div className='what-we-do-text'>
								<h2>Looking to REPAIR & REVIVE your eletronic device?</h2>
								<p>The heart of ReTechnimate lies in its vibrant repair and revive forum. This space is dedicated to enthusiasts who believe in the potential of repair over replacement. Users can connect, share experiences, and exchange knowledge on repairing various electronic devices. Whether it's fixing a glitch or breathing life into an old gadget, this forum empowers users to become proactive participants in the electronics lifecycle, slowing down the cycle of constant consumption.</p>
								<button className='home-to-forum-btn'>
									<Link className='home-to-forum-link'to='/forum'>To our Repair & Revive Forum</Link>
								</button>
							</div>
							<img src={repairpic}/>
						</div>
						<div className='repair-stuff'>
							<img src={donatepic}/>
							<div className='what-we-do-text'>
								<h2>Looking to DONATE your old eletronic device?</h2>
								<p>ReTechnimate features a user-friendly donation form, encouraging individuals to give away their unwanted electronics instead of discarding them. By facilitating the rehoming of functioning devices, we aim to extend the lifespan of these electronics, reducing the volume of e-waste significantly. From smartphones to laptops, these pre-loved devices could find new homes, benefiting others and the environment alike.</p>
								<button className='home-to-forum-btn'>
									<Link className='home-to-forum-link'to='/donation'>To our Donation Drive</Link>
								</button>
							</div>
						</div>
						<div>
							<div className='success-story'>
								<img className="success-story-image" src="https://media.wired.com/photos/596ff3f9eb889b7135754660/16:9/w_1792,h_1008,c_limit/Photoshop-sketch-SOURCE-Adobe-Feature.jpg" />
								<div className='success-story-text'>
									<h2>The Aspiring Designer</h2>
									<p>Sarah is a 13 year old girl in Hope Secondary School, who dreams of becoming a graphic designer, was able to unleash her creativity with the donated devices. Armed with a tablet, she honed her digital art skills, creating stunning visuals that caught the attention of her teachers and peers. Sarah's success is a shining example of how access to electronics has opened doors to a world of possibilities, helping students explore their passions and interests outside the classroom.</p>
								</div>
							</div>
						</div>
						<img className="footer-image" src={footerpic} />
					</div>
        </>
    )
}

