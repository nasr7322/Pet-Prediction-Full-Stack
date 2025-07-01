import { Award, Github, Lightbulb, Linkedin, Mail, Target, Twitter, Users } from 'lucide-react';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { SocialLink } from '../components/ui/SocialLink';
import { StatCard } from '../components/ui/StatCard';
import { ValueCard } from '../components/ui/ValueCard';
import { aboutUsContent } from '../content/pages/aboutUs';

export const AboutUs: React.FC = () => {
  const { hero, sections, values, stats, socialMedia, carouselImages } = aboutUsContent;

  const valueIcons = [Lightbulb, Target, Award, Users];

  const socialIcons = [Github, Twitter, Linkedin, Mail];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
    arrows: false,
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>
          <p className="text-xl text-app-secondary max-w-3xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-20">
          {/* Text Column */}
          <div className="space-y-8 flex flex-col justify-between">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-3xl font-bold text-app-primary mb-4">{section.title}</h2>
                <p className="text-app-secondary leading-relaxed text-lg">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Slider Column */}
          <div className="w-full h-[400px] flex">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Slider {...sliderSettings}>
                {carouselImages.map((image, index) => (
                  <div key={index} className="w-full h-full flex justify-center items-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-app-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={valueIcons[index]}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl p-12 backdrop-blur-sm border border-app mb-20">
          <h2 className="text-3xl font-bold text-app-primary text-center mb-12">Lab Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-app-primary mb-8">{socialMedia.title}</h2>
          <p className="text-app-secondary mb-8 max-w-xl mx-auto">
            {socialMedia.subtitle}
          </p>
          <div className="flex justify-center space-x-6">
            {socialMedia.links.map((social, index) => (
              <SocialLink
                key={index}
                icon={socialIcons[index]}
                name={social.name}
                url={social.url}
                color={social.color}
              />
            ))}
          </div>
          <div className="mt-8 text-app-tertiary text-sm">
            <p>Knights Lab - Advancing AI Research Since 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};