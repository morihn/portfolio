import LanguageProficiency from "@/components/language-proficiency"

export default function Home() {
  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <LanguageProficiency />
      </div>
    </main>
  )
}

