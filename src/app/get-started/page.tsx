import { ArrowRight } from "lucide-react"
import GoogleButton from "../../../firebase/googleButton"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-6xl font-bold text-center text-foreground mb-6"> Get Started </h1>

          {/* YouTube Video Embed */}
          <div className="my-8 w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/J4pXy4sc4WE"
              title="Getting Started Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="space-y-8 mt-10">
            {/* Step 1 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  1
                </span>
                <GoogleButton />
              </h2>
              <p className="text-xl text-muted-foreground ml-14">Sign in (through Google) to set up your account.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  2
                </span>
                <span className="flex items-center">
                  My Listing <ArrowRight className="mx-2" />{" "}
                  <a
                    href="/listing/info"
                    className="text-accent hover:text-accent/80 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Profile
                  </a>
                </span>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">
                This information will be displayed to other users that see your listing. Fill in your in-game friend
                code. Optionally, you can also fill in the Discord ID and Note fields for other ways to contact you or
                information about your listing. Submit your info when you&apos;re ready.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  3
                </span>
                <span className="flex items-center">
                  My Listing <ArrowRight className="mx-2" />{" "}
                  <a
                    href="/listing/have-cards"
                    className="text-accent hover:text-accent/80 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Have Cards
                  </a>
                </span>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">
                These are the cards you have and would like to trade away. Select the cards from the Cards Database and
                save your changes.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  4
                </span>
                <span className="flex items-center">
                  My Listing <ArrowRight className="mx-2" />{" "}
                  <a
                    href="/listing/want-cards"
                    className="text-accent hover:text-accent/80 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Want Cards
                  </a>
                </span>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">
                These are the cards you want and would like to trade for. Select the cards from the Cards Database and
                save your changes.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  5
                </span>
                <a
                  href="/trade"
                  className="text-accent hover:text-accent/80 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Trade
                </a>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">
                You will be shown listings where you have cards the other user wants, and they have cards you want. Sort
                by how many cards they have that you want, or by most recently active users. Select a card on the left
                that you have and a card on the right that you want. Make sure they are the same rarity. Then, send the
                request.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  6
                </span>
                <span className="flex items-center">
                  Requests <ArrowRight className="mx-2" />{" "}
                  <a
                    href="/requests/inbox"
                    className="text-accent hover:text-accent/80 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Inbox
                  </a>
                </span>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">These are the offers other users have made to you.</p>
            </div>

            {/* Step 7 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  7
                </span>
                <span className="flex items-center">
                  Requests <ArrowRight className="mx-2" />{" "}
                  <a
                    href="/requests/sent"
                    className="text-accent hover:text-accent/80 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sent
                  </a>
                </span>
              </h2>
              <p className="text-xl text-muted-foreground ml-14">These are the offers you have made to other users.</p>
            </div>

            {/* Step 8 */}
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <h2 className="flex items-center gap-4 text-3xl font-semibold text-foreground mb-3">
                <span className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full">
                  8
                </span>
                Make a trade!
              </h2>
              <p className="text-xl text-muted-foreground ml-14">
                Feel free to send a friend request to the user on Pokemon TCG Pocket and propose a trade in-game, or
                reach out to them on Discord to coordinate the trade. Also, check if they have any specific instructions
                on their listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
