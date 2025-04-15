import ContactForm from "@/my_components/contactForm"
import FullCardScrollBanner from "@/my_components/fullCardScrollBanner"

export default function Home() {
  return (
    <main className="min-h-screen">
      <FullCardScrollBanner />

      {/* Video Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/J4pXy4sc4WE"
              title="Getting Started Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
