/* eslint-disable no-undef */
import { useEffect, useState } from "react"

export default function SubsciptionsSection() {
  const [orders, setOrders] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER}/order`
      )
      const data = await res.json()
      if (data.success) {
        // format date
        const newData = data?.data?.map((order) => {
          return {
            ...order,
            haveAccess: new Date(order?.endDate) >= new Date(),
            startDate: new Date(order?.startDate).toLocaleDateString("en-US"),
            endDate: new Date(order?.endDate).toLocaleDateString("en-US"),
          }
        })
        // set data to state
        setOrders(newData)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Subscription Plans</h1>
        {orders === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {orders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Plan Name
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">Price</th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Duration Type
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Description
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Start Date
                      <br />
                      <span className="text-xs">(MM/DD/YYYY)</span>
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      End Date
                      <br />
                      <span className="text-xs">(MM/DD/YYYY)</span>
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Have Access
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Transaction ID
                    </th>
                    <th className="py-2 px-4 bg-gray-100 text-left">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => {
                    return (
                      <tr key={order?._id}>
                        <td className="py-2 px-4">{order?.plan?.name}</td>
                        <td className="py-2 px-4">
                          <span className="mr-1 text-xl font-bold">
                            &#x09F3;
                          </span>
                          {order?.plan?.price}
                        </td>
                        <td className="py-2 px-4">
                          {order?.plan?.durationType}
                        </td>
                        <td className="py-2 px-4">
                          {order?.plan?.description}
                        </td>
                        <td className="py-2 px-4">{order?.startDate}</td>
                        <td className="py-2 px-4">{order?.endDate}</td>
                        <td className="py-2 px-4">
                          {order?.haveAccess ? "YES" : "NO"}
                        </td>
                        <td className="py-2 px-4">{order?.tranId}</td>
                        <td className="py-2 px-4">
                          {order?.paidStatus ? (
                            <span className="text-green-600">Paid</span>
                          ) : (
                            <span className="text-red-500">Not Paid</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <h1 className="text-2xl font-bold mb-6">No Orders</h1>
            )}
          </>
        )}
      </div>
    </div>
  )
}
