import Image from "next/image";
import Link from "next/link";

export default function AppDownloadSection(){
    return(
        <>
        <section id="app" className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-yellow-500">Download Our App</h2>
                <p className="text-gray-300 md:text-xl">
                  Get the SpeedyTaxi app for the fastest booking experience. Track your driver in real-time, save your
                  favorite destinations, and enjoy exclusive in-app discounts.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="#" className="inline-block">
                    <Image
                      src="/placeholder.svg?height=60&width=200"
                      width={200}
                      height={60}
                      alt="Download on the App Store"
                      className="h-14 w-auto"
                    />
                  </Link>
                  <Link href="#" className="inline-block">
                    <Image
                      src="/placeholder.svg?height=60&width=200"
                      width={200}
                      height={60}
                      alt="Get it on Google Play"
                      className="h-14 w-auto"
                    />
                  </Link>
                </div>
              </div>  
              <div className="flex justify-center">
              <Image
                 src="https://i.postimg.cc/Y9MJSmtD/salmon-logo-final.jpg"
                 alt="Professional taxi service"
                 className="w-48 h-48 sm:rounded-full object-cover"
              />
              </div>
            </div>
          </div>
        </section>
        </>
    )
}