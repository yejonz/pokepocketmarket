import { ArrowRight } from "lucide-react";
import GoogleButton from "../../../firebase/googleButton";

export default function Home() {
return (
    <div className="flex justify-center">
        <div className="w-1/2 text-gray-700 mb-10">
            <h1 className="justify-self-center text-6xl font-bold"> Get Started </h1>
            <ol className="flex flex-col gap-4 text-3xl mt-10">
            <h2 className="flex gap-4">1. <GoogleButton /></h2>
            <p className="text-xl">
                Sign in (through Google) to set up your account.
            </p>
            <h2 className="flex gap-2 items-center">2. &nbsp;My Listing <ArrowRight /> <a href="/listing/info" className="text-blue-500 underline" target="_blank">Profile</a> </h2>
            <p className="text-xl">
                This information will be displayed to other users that see your listing. Fill in your in-game friend code. Optionally, you can also fill in the Discord ID and Note fields for other ways to contact you or information about your listing. Submit your info when you&apos;re ready.
            </p>
            <h2 className="flex gap-2 items-center">3. &nbsp;My Listing <ArrowRight /> <a href="/listing/have-cards" className="text-blue-500 underline" target="_blank">Have Cards</a></h2>
            <p className="text-xl">
                These are the cards you have and would like to trade away. Select the cards from the Cards Database and save your changes.
            </p>
            <h2 className="flex gap-2 items-center">4. &nbsp;My Listing <ArrowRight /> <a href="/listing/want-cards" className="text-blue-500 underline" target="_blank">Want Cards</a></h2>
            <p className="text-xl">
                These are the cards you want and would like to trade for. Select the cards from the Cards Database and save your changes.
            </p>
            <h2>5. &nbsp;<a href="/trade" className="text-blue-500 underline" target="_blank">Trade</a></h2>
            <p className="text-xl">
                You will be shown listings where you have cards the other user wants, and they have cards you want. Sort by how many cards they have that you want, or by most recently active users. Select a card on the left that you have and a card on the right that you want. Make sure they are the same rarity. Then, send the request.
            </p>
            <h2 className="flex gap-2 items-center">6. &nbsp;Requests <ArrowRight /> <a href="/requests/inbox" className="text-blue-500 underline" target="_blank">Inbox</a></h2>
            <p className="text-xl">
                These are the offers other users have made to you.
            </p>
            <h2 className="flex gap-2 items-center">7. &nbsp;Requests <ArrowRight /> <a href="/requests/sent" className="text-blue-500 underline" target="_blank">Sent</a></h2>
            <p className="text-xl">
                These are the offers you have made to other users.
            </p>
            <h2>8. &nbsp;Make a trade!</h2>
            <p className="text-xl">
                Feel free to send a friend request to the user on Pokemon TCG Pocket and propose a trade in-game, or reach out to them on Discord to coordinate the trade. Also, check if they have any specific instructions on their listing.
            </p>
            </ol>
        </div>
    </div>
)
}
  
  