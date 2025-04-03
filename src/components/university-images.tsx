// This is a helper component to demonstrate how to use actual university images
// Replace the placeholder URLs with your actual image URLs

export const universityImages = {
  // Tehran University of Art
  tehranArtUniversity: {
    coverImage: "/placeholder.svg?height=200&width=600", // Replace with actual campus image
    logo: "/placeholder.svg?height=80&width=80", // Replace with actual logo
    color: "#0057b8", // University brand color
  },

  // Sharif University of Technology
  sharifUniversity: {
    coverImage: "/placeholder.svg?height=200&width=600", // Replace with actual campus image
    logo: "/placeholder.svg?height=80&width=80", // Replace with actual logo
    color: "#00529b", // University brand color
  },

  // Google Career Certificates
  googleCertificates: {
    coverImage: "/placeholder.svg?height=200&width=600", // Replace with Google learning platform image
    logo: "/placeholder.svg?height=80&width=80", // Replace with Google logo
    color: "#4285F4", // Google blue
  },
};

/*
Instructions for adding your actual university images:

1. Create a "public/images/education" folder in your project
2. Add your university campus photos and logos to this folder
3. Update the paths in this file to point to your actual images
4. Example:
   tehranArtUniversity: {
     coverImage: "/images/education/tehran-art-university-campus.jpg",
     logo: "/images/education/tehran-art-university-logo.png",
     color: "#0057b8"
   }
*/
