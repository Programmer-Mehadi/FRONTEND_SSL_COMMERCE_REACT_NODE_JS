/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export default function PlansSection() {
  const [plans, setPlans] = useState(null)
  const [showPlanType, setShowPlanType] = useState("monthly")
  const userdata = {
    name: "Muhammad Mehadi",
    email: `user-${Math.random().toString().slice(4)}@example.com`,
    location: "Lalbagh,DHaka,Bangladesh",
    phoneNumber: "+8801800000000",
  }
  async function fetchData() {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER}/plans`
    )
    const data = await res.json()
    if (data.success) {
      setPlans(data?.data)
    }
  }

  const onSubscribe = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER}/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: id,
          userData: userdata,
        }),
      }
    )
    const data = await res.json()
    if (data?.url) {
      window.location.href = data?.url
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-10">Plans</h2>
      <div className="flex justify-center pb-5">
        <button
          className={`${
            showPlanType === "monthly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-l px-4 py-2`}
          onClick={() => setShowPlanType("monthly")}
        >
          Monthly
        </button>
        <button
          className={`${
            showPlanType === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-r px-4 py-2`}
          onClick={() => setShowPlanType("yearly")}
        >
          Yearly
        </button>
      </div>
      {plans === null && (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      )}
      {showPlanType === "monthly" ? (
        <MonthlySection plans={plans} onSubscribe={onSubscribe} />
      ) : (
        <YearlySection plans={plans} onSubscribe={onSubscribe} />
      )}
    </div>
  )
}

function MonthlySection({ plans, onSubscribe }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto">
      {plans?.monthly?.map((plans) => {
        return (
          <div
            className="bg-white rounded shadow-md overflow-hidden w-64 mx-auto"
            key={plans._id}
          >
            <div className="py-4 px-6 text-center">
              <div className="text-xl font-bold text-gray-800">
                {plans?.name}
              </div>
              <div className="text-3xl font-bold text-gray-700 mt-2">
                ${plans?.price}
              </div>
              <div className="text-sm text-gray-500">
                Billed {plans?.durationType?.toLowerCase()}
              </div>
            </div>

            <div className="py-4 px-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">{plans?.description}</div>
            </div>

            <ul className="py-4 px-6 border-t border-gray-200">
              {plans?.features?.map((feature, index) => {
                return (
                  <li
                    className="flex items-center justify-between mb-2"
                    key={index}
                  >
                    <span className="text-sm text-gray-800">
                      {feature.text}
                    </span>
                    <i
                      className={`fa-solid fa-check ${
                        feature.isAvailable ? "text-green-500" : "text-gray-500"
                      }`}
                    ></i>
                  </li>
                )
              })}
            </ul>
            <button
              className="bg-blue-500 text-white w-full py-2"
              onClick={() => onSubscribe(plans._id)}
            >
              Subscribe
            </button>
          </div>
        )
      })}
    </div>
  )
}
function YearlySection({ plans, onSubscribe }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto">
      {plans?.yearly?.map((plans) => {
        return (
          <div
            className="bg-white rounded shadow-md overflow-hidden w-64 mx-auto"
            key={plans._id}
          >
            <div className="py-4 px-6 text-center">
              <div className="text-xl font-bold text-gray-800">
                {plans?.name}
              </div>
              <div className="text-3xl font-bold text-gray-700 mt-2">
                ${plans?.price}
              </div>
              <div className="text-sm text-gray-500">
                Billed {plans?.durationType?.toLowerCase()}
              </div>
            </div>

            <div className="py-4 px-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">{plans?.description}</div>
            </div>

            <ul className="py-4 px-6 border-t border-gray-200">
              {plans?.features?.map((feature, index) => {
                return (
                  <li
                    className="flex items-center justify-between mb-2"
                    key={index}
                  >
                    <span className="text-sm text-gray-800">
                      {feature.text}
                    </span>
                    <i
                      className={`fa-solid fa-check ${
                        feature.isAvailable ? "text-green-500" : "text-gray-500"
                      }`}
                    ></i>
                  </li>
                )
              })}
            </ul>
            <button
              className="bg-blue-500 text-white w-full py-2"
              onClick={() => onSubscribe(plans._id)}
            >
              Subscribe
            </button>
          </div>
        )
      })}
    </div>
  )
}
