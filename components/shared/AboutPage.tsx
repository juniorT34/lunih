'use client'

export default function AboutPage() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold">About <span className="text-green-600">Us</span></h2>
      <p className="mt-4 max-w-2xl mx-auto">
        Liepaja University New Idea Hub or LUNIH, is a platform where are showcased innovative ideas such as:
      </p>
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
        <div>
          <h3 className="font-bold">Project ideas</h3>
          <p>Individual innovative idea that can be used by anyone specially RTU liepaja university student</p>
        </div>
        <div>
          <h3 className="font-bold">Bachelor/master thesis</h3>
          <p>Proposed thesis ideas that could be used in real world</p>
        </div>
        <div>
          <h3 className="font-bold">Internships</h3>
          <p>Private entities and companies get to publish internship opportunities</p>
        </div>
      </div>
      <footer className="mt-12">
        <p>Liepaja University New Idea Hub</p>
        <p>copyright 2024, all rights reserved.</p>
      </footer>
    </section>
  )
}

