export default function AboutUs() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-10 py-16 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          About Us
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Who we are</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            We are a passionate team of developers building modern web applications with
            Next.js, React, and Tailwind CSS. Our goal is to create fast, accessible, and
            beautiful products that solve real problems.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Our mission</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            To deliver high-quality software that empowers users and businesses alike.
            We believe in open collaboration, clean code, and continuous improvement.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">The team</h2>
          <ul className="flex flex-col gap-4">
            {[
              { name: "Alice Johnson", role: "Lead Engineer" },
              { name: "Bob Smith", role: "Frontend Developer" },
              { name: "Carol White", role: "UX Designer" },
            ].map(({ name, role }) => (
              <li
                key={name}
                className="flex items-center gap-4 rounded-xl border border-black/[.08] dark:border-white/[.12] px-5 py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-black dark:text-zinc-50">
                  {name[0]}
                </div>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">{name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Contact</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            Have questions or want to work with us? Reach out at{" "}
            <span className="font-medium text-black dark:text-zinc-50">hello@example.com</span>.
          </p>
        </section>
      </main>
    </div>
  );
}
