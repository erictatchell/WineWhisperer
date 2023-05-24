export default function Custom404() {
  const goBack = () => {
    window.history.back()
  }
  return (
    <div className="grid mx-5 justify-center mt-10">
      <h1 className="text-xl text-lightdijon font-semibold">Sorry, we couldn't find what you're looking for.</h1>
      <button onClick={goBack} className=" mt-10 uppercase tracking-wide justify-center drop-shadow-xl text-xl border border-dijon text-dijon bg-brendan/50 hover:bg-brendan/80 focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-xl mb-6 py-2 dark:focus:ring-[#3b5998]/55">
        back
      </button>
      <button onClick={goBack} className="uppercase tracking-wide justify-center drop-shadow-xl text-xl border border-dijon text-dijon bg-brendan/50 hover:bg-brendan/80 focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-xl mb-6 py-2 dark:focus:ring-[#3b5998]/55">
        home
      </button>
    </div>
  )
}
