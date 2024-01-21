import { Link, useParams } from "react-router-dom"

export default function Fail() {
  const { tranId } = useParams()

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h2 className="text-center text-3xl font-bold text-red-600">
        Payment Failed
      </h2>
      <p className="px-5 py-2 text-center text-xl font-bold bg-red-300">
        <span>Transaction Id:</span>{" "}
        <span className="font-normal">{tranId}</span>
      </p>
      <p className="text-center text-xl font-bold">Thank You! Try Again</p>
      <Link
        to="/"
        className="text-center text-xl font-bold underline text-blue-600"
      >
        Home
      </Link>
    </div>
  )
}
