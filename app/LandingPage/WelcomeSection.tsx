import { Check } from "lucide-react";

export default function WelcomeSection() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image First on Large Screens */}
            <div className="order-2 lg:order-2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Welcome to Salmon Arm Taxi
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Locally owned Salmon Arm Taxi is a major part of transportation
                services in Salmon Arm all year around.By emphasizing on quality
                and service Salmon Arm Taxi has been providing contractual
                transportation services to many local and national companies.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <Check
                    className="text-yellow-500 bg-yellow-200 p-1 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg text-zinc-700">
                    Well maintained cabs, cleaned inside, outside after every
                    shift.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    className="text-yellow-500 bg-yellow-200 p-1 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg text-zinc-700">
                    Regularly maintained by Red Seal Certified mechanic.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    className="text-yellow-500 bg-yellow-200 p-1 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg text-zinc-700">
                    Our cabs go through at least 6 inspections semi-annually.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    className="text-yellow-500 bg-yellow-200 p-1 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg text-zinc-700">
                    The technologically advanced cloud-based dispatch system.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    className="text-yellow-500 bg-yellow-200 p-1 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg text-zinc-700">
                    Increased automation through IVR and ABOP system to cut the
                    wait time for the calls.
                  </span>
                </li>
              </ul>

              <p className="text-muted-foreground md:text-xl">
                With 24 hours taxi and delivery service, our distinctive Yellow
                colors taxi can be spotted throughout the city. You can count on
                Salmon Arm Taxi excellent 24 hours service for your car break
                down, you vehicle needs a charge boost, you need food or liquor
                delivered, package or parcel delivered local or out of town.
              </p>
            </div>
            <div className="order-1 lg:order-1 space-y-4">
              <img
                src="https://i.postimg.cc/x8tm6dRx/Group-39-1.png"
                alt="Professional taxi service"
                className="mx-auto w-58 md:w-58 overflow-hidden object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
