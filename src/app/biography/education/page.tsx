import EducationSection from "@/components/education-section";


export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-4 md:px-6">
          Education & Credentials
        </h1>
        <EducationSection />
      </div>
    </div>
  );
}
