const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

export const aboutUsContent = {
  hero: {
    title: "Knights Lab",
    subtitle: "A cutting-edge research laboratory dedicated to advancing the field of artificial intelligence and computer vision through innovative solutions and research."
  },
  sections: [
    {
      title: "Our Mission",
      content: "We develop cutting-edge AI technologies to solve real-world problems, focusing on computer vision and pet detection systems."
    },
    {
      title: "Research Focus",
      content: "Our team specializes in deep learning and advanced image processing, pushing the boundaries of AI-powered analysis."
    },
    {
      title: "Technology Impact",
      content: "Our AI models deliver precise pet classification, detection, and segmentation, representing years of research."
    }
  ],
  values: [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI and computer vision technology',
    },
    {
      title: 'Precision',
      description: 'Delivering accurate and reliable AI models for real-world applications',
    },
    {
      title: 'Excellence',
      description: 'Maintaining the highest standards in research and development',
    },
    {
      title: 'Collaboration',
      description: 'Working together to solve complex challenges in AI',
    },
  ],
  stats: [
    { number: '25+', label: 'Research Papers Published' },
    { number: '15+', label: 'AI Models Developed' },
    { number: '3+', label: 'Years of Research' },
    { number: '10+', label: 'Team Members' },
  ],
  socialMedia: {
    title: "Connect With Us",
    subtitle: "Stay updated with our latest research, publications, and breakthroughs in AI and computer vision.",
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/knights-lab',
        color: 'hover:text-gray-300',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/knights_lab',
        color: 'hover:text-blue-400',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/knights-lab',
        color: 'hover:text-blue-500',
      },
      {
        name: 'Email',
        url: 'mailto:contact@knights-lab.com',
        color: 'hover:text-cyan-400',
      },
    ]
  },
  carouselImages: [
    {
      src: 'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/1.webp',
      alt: 'Research Team',
    },
    {
      src: 'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/2.webp',
      alt: 'AI Development',
    },
    {
      src: 'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/3.webp',
      alt: 'Team Collaboration',
    },
  ]
};