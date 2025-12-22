//External imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faUsers, faHandshake, faRocket } from '@fortawesome/free-solid-svg-icons'

const About = () => {
  return (
    <div className="bg-gray-100 pb-16 pt-6">

      <div className="py-10 mb-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-green-700">About SilkRoad</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-center text-gray-700">
            Bridging the gap between discovery and purchase across India since 2008
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">Our Journey</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Launched in 2008, SilkRoad has transcended its roots as a TV shopping channel to become a leading Multi-channel Retail & Discovery Platform. 
            Its unique advantage lies in its ability to bridge the urban-rural divide, effectively reaching and influencing buying decisions across diverse demographics.
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            SilkRoad's strength lies in its multi-pronged approach. It seamlessly blends the reach of seven dedicated TV channels with an established presence on 
            third-party channels and DTH homepages. Its burgeoning digital footprint strategically complements this TV dominance across social media giants 
            like Facebook, Instagram, and Youtube. The company is actively scaling its Digital Business, recognizing the future of retail lies in the online space.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">Our Approach</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            But SilkRoad's success goes beyond mere presence. It's powered by a robust, in-house technology platform designed for performance marketing. 
            This bespoke system boasts built-in predictive analytics, which optimize business processes and seamlessly integrate operations, ensuring top-notch efficiency.
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            SilkRoad thrives on a marketplace model, leveraging its technological prowess, strong sourcing and delivery networks, and multi-lingual programming 
            and digital marketing capabilities (spanning six languages!). This comprehensive approach sets SilkRoad apart, solidifying its position as a pioneer in the Indian retail landscape.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">How Did We Do It?</h2>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            Behind the scenes at SilkRoad, a team of driven individuals (the SilkRoadites!) is always working to unlock the full potential of every opportunity. 
            Whether it's closing a deal, streamlining operations, building cutting-edge tech, or creating captivating marketing campaigns, our combined expertise 
            is fueled by a deep well of research and insights. The result? A thriving environment where we deliver the best, every single day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faLightbulb} className="text-xl text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800 mb-2">Innovation</h3>
                <p className="text-gray-700">Constantly evolving our approach to meet changing consumer needs</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faUsers} className="text-xl text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800 mb-2">Customer Focus</h3>
                <p className="text-gray-700">Dedicated to understanding and serving our diverse customer base</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faHandshake} className="text-xl text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800 mb-2">Reliability</h3>
                <p className="text-gray-700">Building trust through consistent quality and service</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faRocket} className="text-xl text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800 mb-2">Growth Mindset</h3>
                <p className="text-gray-700">Continuously expanding our reach and capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
