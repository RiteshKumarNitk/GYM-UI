export default function SidebarWidget() {
  return (
    <div
      className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]"
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Innovatex Technology
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        We specialize in cutting-edge software and web development services
        designed to elevate your business. From custom software to innovative web solutions, we bring your digital visions to life.
      </p>
      <a
        href="https://innovatex-technology.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-blue-600 text-theme-sm hover:bg-blue-700"
      >
        Visit Website
      </a>
    </div>
  );
}
