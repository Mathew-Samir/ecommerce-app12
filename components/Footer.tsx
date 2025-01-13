export default function Footer() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 E-Commerce Store. All rights reserved.</p>
        <p>Submitted on: {currentDate}</p>
      </div>
    </footer>
  )
}

