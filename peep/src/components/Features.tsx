import { Card, CardContent } from'../../components/ui/card'

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Speak Your Mind</h2>
          <p className="text-gray-300">Unleash your inner genius. We'll capture every witty remark and profound thought.</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Flashcards, But Make It Cool</h2>
          <p className="text-gray-300">Our AI turns your words into flashcards so slick, you'll actually want to study. Imagine that.</p>
        </CardContent>
      </Card>
    </div>
  )
}