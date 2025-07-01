const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

export const websiteFeaturesContent = {
  hero: {
    title: "AI Pet Detection",
    subtitle: "This app uses cutting-edge AI to spot, identify, and mask pets in images.\nWhether you're looking to fetch insights or paws for editing, our tools are purr-fect for your pet projects!",
    ctaText: "Get Started",
    ctaTextAuthenticated: "Try AI Models Now"
  },
  features: [
    {
      title: 'Pet Classification',
      description: 'Upload an image and our AI will instantly determine if it contains a pet and identify the type of animal.',
      gradient: 'from-cyan-500 to-blue-600',
      examples: [
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/C0.webp',
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/C1.webp',
      ],
    },
    {
      title: 'Pet Detection',
      description: 'Locate and highlight pets in your images with precise bounding boxes showing their exact positions.',
      gradient: 'from-green-500 to-teal-600',
      examples: [
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/D0.webp',
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/D1.webp'
      ],
    },
    {
      title: 'Pet Segmentation',
      description: 'Create pixel-perfect masks that separate pets from the background for advanced image editing.',
      gradient: 'from-purple-500 to-pink-600',
      examples: [
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/S0.webp',
        'https://raw.githubusercontent.com/nasr7322/Pet-Prediction-Full-Stack/refs/heads/main/Frontend/src/assets/S1.webp'
      ],
    },
  ],
  howItWorks: {
    title: "How It Works",
    steps: [
      { 
        step: '01', 
        title: 'Upload Your Image', 
        desc: 'Choose or drag-and-drop a photo containing your pet. Supported formats include JPG, PNG, and more.' 
      },
      { 
        step: '02', 
        title: 'AI Magic Happens', 
        desc: 'Our advanced AI analyzes your image, detecting, classifying, or segmenting pets with high accuracy.' 
      },
      { 
        step: '03', 
        title: 'See Instant Results', 
        desc: 'View highlighted pets, detailed labels, and download segmented images for your projects or sharing.' 
      },
    ]
  }
};